const { selectQuery, insertIntoQuery } = require('../service');
const jwt = require('jsonwebtoken');
const { user } = require('../service/sentence');
const { changeStateAndReturnBody, paramsOrBody } = require('../utils/utils');
const { sql } = require('mysqls');
const { mode } = require('../../config/config.default');
const { isEmpty } = require('lodash');

function createToken(tokenMsg) {
    let payload = { user: tokenMsg, time: new Date().getTime(), timeout: 60 * 60 * 24 * 100 };
    let token = jwt.sign(payload, 'screct');
    return token;
}

const userController = {
    async loginHandler(ctx) {
        try {
            paramsOrBody.call(ctx, 1);
            const data = ctx.request.body;
            const accountStatus = await sql.table('login_table').where({ account: data.account }).select(true).exec();
            let result = await sql.table('login_table').where(data).select(true).exec();
            if (accountStatus.length === 0) {
                changeStateAndReturnBody.call(ctx, 400, {
                    tips: '账号未注册'
                });
                return;
            }
            if (result.length === 0) {
                changeStateAndReturnBody.call(ctx, 400, {
                    tips: '账号或者密码错误'
                });
                return;
            }
            const article = await sql.table('article_table').where({ author_id: result[0].author_id }).select(true).exec();
            result[0]['article'] = article;
            const token = createToken(result[0]);
            changeStateAndReturnBody.call(ctx, 200, {
                tips: '登陆成功',
                token,
                result
            });
        } catch (error) {
            changeStateAndReturnBody.call(ctx, 400, {
                tips: '登陆失败',
                message: error.message
            });
        }
    },

    async registeredHandler(ctx) {
        try {
            // paramsOrBody.call(ctx, 1);
            const data = ctx.request.body;
            const randomNumber = Math.floor(Math.random() * 400);
            let imageUrl;
            if (!isEmpty(ctx.request.files)) {
                let { fieldname, filename, destination } = ctx.request.files[0];
                destination = destination.split('/')[2] === 'registered' ? 'user' : destination.split('/')[2];
                imageUrl = `${mode.production.SERVER_URL}:${mode.production.PORT}/uploads/${destination}/${filename}`;
            }
            /** 初始化用户数据 */
            const defaultAccountData = {
                create_date: +new Date(),
                user_head: imageUrl ? imageUrl : null,
                author_id: randomNumber,
                account_state: 1,
                ...data
            };

            /** 判断是否已有用户 有则无需注册 */
            const result = await selectQuery(user.selectByAccount, data.account);
            if (result.length !== 0) {
                changeStateAndReturnBody.call(ctx, 401, {
                    tips: '请勿重新注册'
                });
                return;
            }

            // 插入用户数据 注册成功
            await insertIntoQuery('login_table', [[Object.keys(defaultAccountData).join()], Object.values(defaultAccountData)]);
            changeStateAndReturnBody.call(ctx, 200, {
                tips: '注册成功',
                ...defaultAccountData
            });
        } catch (error) {
            // 其他情况注册失败
            changeStateAndReturnBody.call(ctx, 400, {
                tips: '注册失败',
                message: error.message
            });
        }
    }
};

module.exports = userController;

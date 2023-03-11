const { upload } = require('../service/sentence');
const { selectQuery } = require('../service');
const { changeStateAndReturnBody, whetherHave, deleteFile, paramsOrBody } = require('../utils/utils');
const path = require('path');
const { mode } = require('../../config/config.default');
const { isEmpty } = require('lodash');
const { sql } = require('mysqls');

const uploadController = {
    /**
     * 上传文章封面
     * @requestParams
     * *id:文章id
     */
    async articleUpload(ctx) {
        try {
            let body = { ...ctx.request.body };
            let imageUrl;
            let name;
            paramsOrBody.call(ctx, 1);
            whetherHave(body, ['id']);
            if (!isEmpty(ctx.request.files)) {
                let { fieldname, filename, destination } = ctx.request.files[0];
                name = fieldname;
                destination = destination.split('/')[2] === 'registered' ? 'user' : destination.split('/')[2];
                imageUrl = `${mode.production.SERVER_URL}:${mode.production.PORT}/uploads/${destination}/${filename}`;
            }

            /** 如果已经存有同样的照片则不再存储 */
            let result = await sql.table('article_table').where({ id: body.id }).select(true).exec();
            if (result.length && result[0].article_image === imageUrl) {
                changeStateAndReturnBody.call(ctx, 401, {
                    msg: '这张照片已经上传过了'
                });
                // 删除这张图片
                // deleteFile(path.join(__dirname, '../../public/uploads'), fieldname);
                return;
            }

            // 如果没有则插入新的图片
            let insertInfo = await sql.table('article_table').where({ id: body.id }).select(true).exec();
            if (!insertInfo.length) {
                changeStateAndReturnBody.call(ctx, 401, {
                    msg: '没有这篇文章'
                });
                return;
            }
            changeStateAndReturnBody.call(ctx, 200, {
                msg: '上传成功',
                filename: name,
                url: imageUrl
            });
        } catch (error) {
            changeStateAndReturnBody.call(ctx, 400, {
                tips: '上传出问题啦',
                error: error.message
            });
        }
    },

    /** 用户头像上传 */
    async userUpload(ctx) {
        try {
            let body = { ...ctx.request.body };
            whetherHave(body, ['id']);
            let imageUrl;
            if (!isEmpty(ctx.request.files)) {
                let { fieldname, filename, destination } = ctx.request.files[0];
                destination = destination.split('/')[2];
                imageUrl = `${mode.production.SERVER_URL}:${mode.production.PORT}/uploads/${destination}/${filename}`;
            }
            let info = await sql.table('login_table').data({ user_head: imageUrl }).where({ user_id: body.id }).update(true).exec();
            if (info.affectedRows) {
                changeStateAndReturnBody.call(ctx, 200, {
                    tips: '上传成功',
                    user_head: imageUrl
                });
            } else {
                changeStateAndReturnBody.call(ctx, 200, {
                    tips: '没有这个用户'
                });
            }
        } catch (error) {
            changeStateAndReturnBody.call(ctx, 400, {
                tips: '上传出问题啦',
                error: error.message
            });
        }
    }
};

module.exports = uploadController;

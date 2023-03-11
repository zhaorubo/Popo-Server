const { selectQuery, insertIntoQuery } = require('../service');
let { sql } = require('mysqls');
const { article } = require('../service/sentence');
const { mode } = require('../../config/config.default');
const _ = require('loadsh');
const { changeStateAndReturnBody, paramsOrBody, whetherHave } = require('../utils/utils');
const { isEmpty } = require('lodash');

const articleController = {
    /**
     *
     * @requestParam
     * null
     * 获取所有文章
     */
    async getArticleHandler(ctx) {
        try {
            let result;
            let params = ctx.query;
            if (!_.isEmpty(params)) {
                result = await sql.table('article_table').data(params).select(true).exec();
            }
            result = await selectQuery(article.selectAllArticle);
            changeStateAndReturnBody.call(ctx, 200, {
                tips: 'sccuess',
                result
            });
        } catch (error) {
            changeStateAndReturnBody.call(ctx, 400, { tips: '请求出问题啦', error: error.message });
        }
    },

    /**
     * 创建文章
     * @requestParams
     *     *title:文章的标题,
     *     *content:文章的内容,
     *     *category:文章所属类目
     *     *author_id:作者id标识,
     *     *author_name:作者名字,
     *     active:文章的状态,(默认为1),
     *     article_image:文章的封面,
     *     create_date:创建时间,
     *     update_date:修改时间,
     *     author:作者信息,一般用作返回，可不传,
     */
    async createArticleHandler(ctx) {
        try {
            paramsOrBody.call(ctx, 1);
            let data = { ...ctx.request.body };
            whetherHave(data, ['title', 'content', 'category', 'author_id', 'author_name']);
            let result = await sql.table('article_table').where({ title: data.title }).select(true).exec();
            let imageUrl;
            if (ctx.request.files) {
                let { fieldname, filename, destination } = ctx.request.files[0];
                destination = destination.split('/')[2];
                imageUrl = `${mode.production.SERVER_URL}:${mode.production.PORT}/uploads/${destination}/${filename}`;
            }
            const insertData = {
                active: 1,
                article_image: null,
                create_date: +new Date(),
                update_date: +new Date(),
                author: null,
                ...data,
                article_image: imageUrl ? imageUrl : null
            };
            console.log(imageUrl, 'imageUrl');
            if (result.length >= 1) {
                changeStateAndReturnBody.call(ctx, 400, {
                    tips: `${data.title}:标题已经创建过了`
                });
                return;
            }
            await sql.table('article_table').data(insertData).insert(true).exec();
            // await insertIntoQuery('article_table', [[Object.keys(insertData).join()], Object.values(insertData)]);
            changeStateAndReturnBody.call(ctx, 200, {
                tips: 'sccuess',
                result: insertData
            });
        } catch (error) {
            changeStateAndReturnBody.call(ctx, 400, {
                tips: '请求出问题啦',
                error: error.message
            });
        }
    },

    /**
     * 删除文章
     * @requestParam
     * *id:需要删除的文章id
     */
    async deleteArticleHandler(ctx) {
        try {
            paramsOrBody.call(ctx, 0);
            const data = { ...(isEmpty(ctx.request.body) ? ctx.query : ctx.request.body) };
            whetherHave(data, ['id']);
            let result = await sql.table('article_table').where(data).delet(true).exec();
            if (!result.affectedRows) {
                changeStateAndReturnBody.call(ctx, 400, {
                    tips: '没有这篇文章'
                });
                return;
            }
            changeStateAndReturnBody.call(ctx, 200, {
                tips: '删除成功'
            });
        } catch (error) {
            changeStateAndReturnBody.call(ctx, 400, {
                tips: '请求出问题啦',
                error: error.message
            });
        }
    },

    /**
     *  修改文章
     * @requestParam
     * *id:文章id
     * *title:文章的标题
     * *content:文章内容
     */
    async changeArticleHandler(ctx) {
        try {
            paramsOrBody.call(ctx, 1);
            let body = { ...ctx.request.body };
            whetherHave(body, ['id', 'title', 'content']);
            /** 如果有上传的文章封面则生成url */
            if (ctx.request.files) {
                const { fieldname, filename, destination } = ctx.request.files[0];
                imageUrl = `${mode.production.SERVER_URL}:${mode.production.PORT}/uploads/${destination}/${filename}`;
                body.article_image = imageUrl;
            }
            /** 更新文章内容 */
            let updateResult = await sql.table('article_table').data(body).where({ id: ctx.request.body.id }).update(true).exec();
            // 获取更新成功的文章
            let updateArt = await sql.table('article_table').where({ id: ctx.request.body.id }).select(true).exec();
            // 判断数据库是否有更新成功的row
            if (!updateResult.affectedRows) {
                changeStateAndReturnBody.call(ctx, 401, {
                    msg: '没有这篇文章'
                });
                return;
            } else {
                changeStateAndReturnBody.call(ctx, 200, {
                    tips: 'sccuess',
                    article: updateArt[0]
                });
            }
        } catch (error) {
            changeStateAndReturnBody.call(ctx, 400, {
                tips: '请求出问题啦',
                error: error.message
            });
        }
    }
};

module.exports = articleController;

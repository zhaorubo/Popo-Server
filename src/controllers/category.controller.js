let { sql } = require('mysqls');
const _ = require('loadsh');
const { changeStateAndReturnBody, whetherHave, paramsOrBody } = require('../utils/utils');
const { isEmpty } = require('lodash');

/**
 *
 * @param {String} label 需要查看的类目标题
 * @returns void
 */
async function lookCategory(label) {
    let categoryInfo = await sql.table('category_table').where({ label: body.label }).select(true).exec();
    if (!categoryInfo.length) {
        changeStateAndReturnBody.call(ctx, 400, {
            tips: '没有这条类目'
        });
        return false;
    } else {
        return true;
    }
}

const categoryController = {
    /**
     * 获取所有类目信息
     * @requestParams
     * null
     */
    async getCategory(ctx) {
        try {
            let result;
            let params = ctx.query;
            if (!isEmpty(params)) {
                result = await sql.table('category_table').data(params).select(true).exec();
            }
            result = await sql.table('category_table').select(true).exec();
            changeStateAndReturnBody.call(ctx, 200, {
                tips: 'success',
                result
            });
        } catch (error) {
            changeStateAndReturnBody.call(ctx, 400, {
                tips: '请求出问题啦',
                error: error.message
            });
        }
    },

    /**
     * 创建文章类目
     * @requestParam
     * *label:类目的标题
     *
     */
    async createCategory(ctx) {
        try {
            paramsOrBody.call(ctx, 1);
            let body = ctx.request.body;
            whetherHave(body, ['label']);
            let len = await sql.table('category_table').where({ label: body.label }).select(true).exec();
            if (len.length >= 1) {
                changeStateAndReturnBody.call(ctx, 400, {
                    tips: '类目已经被创建过了'
                });
                return;
            }
            body = {
                create_date: +new Date(),
                active: '1',
                ...body
            };
            await sql.table('category_table').data(body).insert(true).exec();
            changeStateAndReturnBody.call(ctx, 200, {
                tips: '创建成功'
            });
        } catch (error) {
            changeStateAndReturnBody.call(ctx, 400, {
                tips: '请求出问题啦',
                error: error.message
            });
        }
    },

    /**
     * 删除类目
     * @requestParams
     * *id:类目id
     * @returns
     */
    async deleteCategory(ctx) {
        try {
            paramsOrBody.call(ctx, 0);
            let body = { ...ctx.query };
            whetherHave(body, ['id']);
            let result = await sql.table('category_table').where(body).delet(true).exec();
            if (!result.affectedRows) {
                changeStateAndReturnBody.call(ctx, 400, {
                    tips: '没有这条类目'
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
     *  修改类目信息
     * @requestParams
     * *label:类目标题
     * @returns
     */
    async changeCategory(ctx) {
        try {
            paramsOrBody.call(ctx, 1);
            let body = ctx.request.body;
            whetherHave(body, ['label', 'id']);
            // 获取修改前的类目
            let [categoryInfo] = await sql.table('category_table').where({ id: body.id }).select(true).exec();
            // 修改所属的所有文章
            let updateArticleInfo = await sql.table('article_table').data({ category: body.label }).where({ category: categoryInfo.label }).update(true).exec();
            // 修改类目
            let result = await sql.table('category_table').data(body).where({ label: body.label }).update(true).exec();
            if (!result.affectedRows) {
                changeStateAndReturnBody.call(ctx, 400, {
                    tips: '没有这条类目'
                });
                return;
            }
            changeStateAndReturnBody.call(ctx, 200, {
                tips: `修改成功:${categoryInfo.label} to ${body.label}`,
                updateArticleTotal: updateArticleInfo.affectedRows
            });
        } catch (error) {
            changeStateAndReturnBody.call(ctx, 400, {
                tips: '请求出问题啦',
                error: error.message
            });
        }
    },

    /**
     *
     * @requestParams
     * *category: 需要获取文章对应的类目
     */
    async getCategoryToArticle(ctx) {
        try {
            paramsOrBody.call(ctx, 0);
            let params = { ...ctx.query };
            whetherHave(params, ['label']);
            let result = await sql.table('article_table').where({ category: params.label }).select(true).exec();
            if (result.length !== 0) {
                changeStateAndReturnBody.call(ctx, 200, {
                    tips: '获取成功啦',
                    articles: result
                });
            } else {
                changeStateAndReturnBody.call(ctx, 400, {
                    tips: '没有搜到哦',
                    article: result
                });
            }
        } catch (error) {
            changeStateAndReturnBody.call(ctx, 400, {
                tips: '获取失败啦',
                message: error.message
            });
            return;
        }
    }
};

module.exports = categoryController;

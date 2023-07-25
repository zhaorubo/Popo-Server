import { Container } from 'typedi';
import { ArticleApi } from '../config/types.ts';
import { RouterContext } from 'koa-router';
/** 用户业务入口 */
export default {
    /** 创建文章 */
    [ArticleApi.CREATE_ARTICLE]: async (ctx: RouterContext) => {
        ctx.body = await articleController.artCreate(ctx)
        return;
    },

    /** 删除文章 */
    [ArticleApi.DELETE_ARTICLE]: async (ctx: RouterContext) => {
        ctx.body = await articleController.artDelete(ctx)
        return;
    },

    /** 获取全部文章 */
    [ArticleApi.GETALL_ARTICLE]: () => { },
    /** 获取单个文章 */
    [ArticleApi.GET_ARTICLE]: async (ctx: RouterContext) => {
        ctx.body = await articleController.artGet(ctx)
        return;
    },

    /** 更新文章 */
    [ArticleApi.UPDATE_ARTICLE]: async (ctx: RouterContext) => {
        ctx.body = await articleController.artUpdate(ctx)
        return;
    },

    /** 创建评论 */
    [ArticleApi.CREATE_COMMENT]: async (ctx: RouterContext) => {
        ctx.body = await articleController.comCreate(ctx)
        return;
    },

    /** 删除评论 */
    [ArticleApi.DELETE_COMMENT]: async (ctx: RouterContext) => {
        ctx.body = await articleController.comDelete(ctx)
        return;
    },

    /** 获取所有评论列表 */
    [ArticleApi.GETALL_COMMENTS]: async (ctx: RouterContext) => {
        ctx.body = await articleController.comGetAll(ctx)
        return;
    }
};

import { Container } from 'typedi';
import { ArticleApi } from '../config/types.ts';
import { RouterContext } from 'koa-router';
/** 用户业务入口 */
export default {
    /** 创建文章 */
    [ArticleApi.CREATE_ARTICLE]: async (ctx: RouterContext) => {},
    /** 删除文章 */
    [ArticleApi.DELETE_ARTICLE]: () => {},
    /** 获取全部文章 */
    [ArticleApi.GETALL_ARTICLE]: () => {},
    /** 获取单个文章 */
    [ArticleApi.GET_ARTICLE]: () => {},
    /** 更新文章 */
    [ArticleApi.UPDATE_ARTICLE]: () => {},
    [ArticleApi.CREATE_COMMENT]: () => {},
    [ArticleApi.DELETE_COMMENT]: () => {},
    [ArticleApi.GETALL_COMMENTS]: () => {}
};

import Router from 'koa-router';
const router = new Router();
import { UserApi, ArticleApi } from '../config/types.ts';

/** 业务入口模块导入 */
import userApi from '../api/userApi.ts';
import articleApi from '../api/articleApi.ts';

/** 路由注册类 */
export class RegRoutes {
    constructor() {
        this.reg();
    }
    private static _ins: RegRoutes;
    private _routes: Map<{ method: string; path: string }, Function>;
    public static ins(): RegRoutes {
        if (!this._ins) {
            this._ins = new RegRoutes();
        }
        return this._ins;
    }
    public reg(): void {
        if (!this._routes) this._routes = new Map();
        this.regUserRoute();
        this.regArticleRoute();
    }

    /** 用户路由注册 */
    private regUserRoute(): void {
        // 登陆
        this._routes.set({ method: 'post', path: UserApi.LOGIN }, userApi[UserApi.LOGIN]);
        // 登出
        this._routes.set({ method: 'post', path: UserApi.LOGOUT }, userApi[UserApi.LOGOUT]);
        // 注册
        this._routes.set({ method: 'post', path: UserApi.REGISTER }, userApi[UserApi.REGISTER]);
        // 更新
        this._routes.set({ method: 'put', path: UserApi.UPDATE_USER }, userApi[UserApi.UPDATE_USER]);
        // 获取详情
        this._routes.set({ method: 'get', path: UserApi.GET_USER }, userApi[UserApi.GET_USER]);
        // 获取全部列表
        this._routes.set({ method: 'get', path: UserApi.LIST_USERS }, userApi[UserApi.LIST_USERS]);
        // 删除用户
        this._routes.set({ method: 'delete', path: UserApi.DELETE_USER }, userApi[UserApi.DELETE_USER]);
    }

    /** 文章路由注册 */
    private regArticleRoute(): void {
        /** 获取全部文章 */
        this._routes.set({ method: 'get', path: ArticleApi.GETALL_ARTICLE }, articleApi[ArticleApi.GETALL_ARTICLE]);
        /** 获取单个文章 */
        this._routes.set({ method: 'get', path: ArticleApi.GET_ARTICLE }, articleApi[ArticleApi.GET_ARTICLE]);
        /** 创建文章 */
        this._routes.set({ method: 'post', path: ArticleApi.CREATE_ARTICLE }, articleApi[ArticleApi.CREATE_ARTICLE]);
        /** 更新文章 */
        this._routes.set({ method: 'put', path: ArticleApi.UPDATE_ARTICLE }, articleApi[ArticleApi.UPDATE_ARTICLE]);
        /** 删除文章 */
        this._routes.set({ method: 'delete', path: ArticleApi.DELETE_ARTICLE }, articleApi[ArticleApi.DELETE_ARTICLE]);
    }

    public init(): void {
        this._routes.forEach((value, key) => {
            router[key.method](key.path, value);
        });
    }
}

/** 路由初始化 */
RegRoutes.ins().init();
export default router;

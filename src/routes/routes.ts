import Router from 'koa-router';
const router = new Router();

/** 路由的枚举 */
export enum ApiType {
    USER = '/'
}

/** 业务入口模块导入 */
import userApi from '../api/userApi.ts';

/** 路由注册类 */
export class RegRoutes {
    constructor() {
        this.reg();
    }
    private static _ins: RegRoutes;
    private _routes: Map<{ method: string; path: ApiType }, Function>;
    public static ins(): RegRoutes {
        if (!this._ins) {
            this._ins = new RegRoutes();
        }
        return this._ins;
    }
    public reg(): void {
        if (!this._routes) this._routes = new Map();
        this.regUserRoute();
    }

    /** 用户路由注册 */
    private regUserRoute() {
        this._routes.set({ method: 'get', path: ApiType.USER }, userApi[ApiType.USER]);
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

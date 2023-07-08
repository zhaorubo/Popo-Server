import Router from 'koa-router';
const router = new Router();
import { UserApi } from '../config/types.ts';

/** 业务入口模块导入 */
import userApi from '../api/userApi.ts';

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
    }

    /** 用户路由注册 */
    private regUserRoute() {
        this._routes.set({ method: 'post', path: UserApi.LOGIN }, userApi[UserApi.LOGIN]);
        this._routes.set({ method: 'post', path: UserApi.REGISTER }, userApi[UserApi.REGISTER]);
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

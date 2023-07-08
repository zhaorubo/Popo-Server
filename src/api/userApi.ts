import { Container } from 'typedi';
import UserController from '../controllers/UserController.ts';
import { UserApi } from '../config/types.ts';
import { RouterContext } from 'koa-router';
/** 用户业务入口 */
export default {
    [UserApi.LOGIN]: async (ctx: RouterContext) => {
        // 获取依赖
        let userController = Container.get(UserController);
        // userController 是网络层(用户请求第一接触的类)
        ctx.body = await userController.logIn(ctx);
        return;
    },
    [UserApi.LOGOUT]: () => {},
    [UserApi.GET_USER]: async (ctx: RouterContext) => {
        // 获取依赖
        let userController = Container.get(UserController);
        // userController 是网络层(用户请求第一接触的类)
        ctx.body = await userController.logIn(ctx);
        return;
    },
    [UserApi.DELETE_USER]: () => {},
    [UserApi.LIST_USERS]: () => {},
    [UserApi.UPDATE_USER]: () => {},
    [UserApi.REGISTER]: async (ctx: RouterContext) => {
        // 获取依赖
        let userController = Container.get(UserController);
        ctx.body = await userController.regIster(ctx);
        return;
    }
};

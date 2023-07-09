import { Container } from 'typedi';
import UserController from '../controllers/UserController.ts';
import { UserApi } from '../config/types.ts';
import { RouterContext } from 'koa-router';
let userController = Container.get(UserController);
/** 用户业务入口 */
export default {
    [UserApi.LOGIN]: async (ctx: RouterContext) => {
        // 获取依赖
        // userController 是网络层(用户请求第一接触的类)
        ctx.body = await userController.logIn(ctx);
        return;
    },
    [UserApi.REGISTER]: async (ctx: RouterContext) => {
        // 获取依赖
        ctx.body = await userController.register(ctx);
        return;
    },
    [UserApi.LOGOUT]: () => {},
    [UserApi.GET_USER]: async (ctx: RouterContext) => {
        ctx.body = await userController.getUser(ctx);
        return;
    },
    [UserApi.DELETE_USER]: async (ctx: RouterContext) => {
        ctx.body = await userController.deleteUser(ctx);
        return;
    },
    [UserApi.LIST_USERS]: (ctx: RouterContext) => {
        ctx.body = userController.getAllUser(ctx);
    },
    [UserApi.UPDATE_USER]: () => {}
};

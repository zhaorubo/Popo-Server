import { Container } from 'typedi';
import UserController from '../controllers/UserController.ts';
import { UserApi } from '../config/Enum.ts';
import { RouterContext } from 'koa-router';
let userController = Container.get(UserController);
/** 用户业务入口 */
export default {
    /** API: 登陆 */
    [UserApi.LOGIN]: async (ctx: RouterContext) => {
        // userController 是网络层(用户请求第一接触的类)
        ctx.body = await userController.logIn(ctx);
        return;
    },
    /** API: 注册 */
    [UserApi.REGISTER]: async (ctx: RouterContext) => {
        ctx.body = await userController.register(ctx);
        return;
    },
    /** API: 登出 */
    [UserApi.LOGOUT]: () => {},
    [UserApi.GET_USER]: async (ctx: RouterContext) => {
        ctx.body = await userController.getUser(ctx);
        return;
    },
    /** API: 注销 */
    [UserApi.DELETE_USER]: async (ctx: RouterContext) => {
        ctx.body = await userController.deleteUser(ctx);
        return;
    },
    /** API: 全部用户信息 */
    [UserApi.LIST_USERS]: (ctx: RouterContext) => {
        ctx.body = userController.getAllUser(ctx);
        return;
    },
    /** API: 更新 */
    [UserApi.UPDATE_USER]: (ctx: RouterContext) => {
        ctx.body = userController.updateUser(ctx);
        return;
    }
};

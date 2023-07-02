import { Container } from 'typedi';
import UserController from '../controllers/UserController.ts';
enum ApiType {
    USER = '/'
}

/** 用户业务入口 */
export default {
    [ApiType.USER]: async ctx => {
        // 获取依赖
        let userController = Container.get(UserController);
        // userController 是网络层(用户请求第一接触的类)
        ctx.body = await userController.signUp(ctx);
        return;
    }
};

import { Service } from 'typedi';
import UserService from '../services/UserService.ts';
import { RouterContext } from 'koa-router';
import { UserResponse, UserResquest } from '../types/project';
import { Status } from '../utils/Status.ts';

@Service()
// 网络控制层  可以在此处验证请求是否合理
export default class UserController {
    constructor(userService: UserService) {
        this._userService = userService;
    }
    private _userService: UserService;

    /** 登录 */
    public async logIn(ctx: RouterContext) {
        // 路由层实际负责的
        const reqData: UserResquest = ctx.request.body as UserResquest;
        if (!this.checkKeys(reqData)) {
            return {
                code: Status.NOT_MEET_WITH,
                prompt: Status.message
            } as UserResponse;
        }
        const result = await this._userService.Login(reqData);

        // 返回一个响应到客户端
        return result;
    }
    /** 注册 */
    public async regIster(ctx: RouterContext) {
        const subData: UserResquest = ctx.request.body as UserResquest;
        if (!this.checkKeys(subData)) {
            return {
                code: Status.NOT_MEET_WITH,
                prompt: Status.message
            } as UserResponse;
        }
        const result = await this._userService.Register(subData);
        return result;
    }

    /** 检查请求字段 */
    private checkKeys(reqData: UserResquest): boolean {
        if (!reqData) return false;
        let checkArr = ['loginId', 'password'];
        for (let i = 0; i < checkArr.length; i++) {
            const key: string = checkArr[i];
            if (!reqData[key]) {
                return false;
            }
        }
        return true;
    }
    /** 检测接收账号合规 */
    private checkAccountNumber(reqData: UserResquest): boolean {
        if (!reqData) return false;

        return true;
    }
    /** 60秒不能重复发送 */
}

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

    public async signUp(ctx: RouterContext) {
        // 路由层实际负责的
        const reqData: UserResquest = ctx.body as UserResquest;
        if (!this.checkKeys(reqData)) {
            return {
                code: Status.NOT_MEET_WITH,
                prompt: Status.message
            } as UserResponse;
        }
        const user = await this._userService.Signup(reqData);
        // 返回一个响应到客户端
        return user;
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
}

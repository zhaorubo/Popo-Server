import { LoginRequestData, RegisterRequestData } from '../types/user';
import UserService from '../services/UserService.ts';
import routeParameterDecorator from '../decorators/routeParameterDecorator.ts';
import { Service } from 'typedi';
import { RouterContext } from 'koa-router';
import { UserResponse, UserResquest } from '../types/project';
import { Status } from '../utils/Status.ts';

// 网络控制层  可以在此处验证请求是否合理
export default class UserController {
    constructor(userService: UserService) {
        super();
        this._userService = userService;
    }
    private _userService: UserService;
    public _params: any;
    public set params(val: any) {
        this._params = val;
    }

    public _params: any;
    public set params(val: any) {
        this._params = val;
    }

    @(routeParameterDecorator<LoginRequestData>)
    /** 登录 */
    @routeParameterDecorator(['loginId', 'password'])
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
        return user;
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

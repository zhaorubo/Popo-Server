import { Service } from 'typedi';
import UserService from '../services/UserService.ts';
import { RouterContext } from 'koa-router';
import { UserResponse, UserResquest } from '../types/project';
import { Status } from '../utils/Status.ts';
import Controller from './Controller.ts';
import { Response } from '../types/project';
import { LoginRequestData, RegisterRequestData, UserData } from '../types/user';
import routeParameterDecorator from '../decorators/routeParameterDecorator.ts';

@Service()
// 网络控制层  可以在此处验证请求是否合理
export default class UserController extends Controller {
    constructor(userService: UserService) {
        super();
        this._userService = userService;
    }
    private _userService: UserService;

    public _params: any;
    public set params(val: any) {
        this._params = val;
    }

    /** 登录 */
    @(routeParameterDecorator<LoginRequestData>)
    public async logIn(ctx: RouterContext) {
        // 路由层实际负责的
        // 路由层实际负责的
        // 查找有无字段
        let notKeys: string[] | null = this.checkKeys<LoginRequestData>(this._params, ['loginId', 'password']);
        if (!notKeys) {
            // 有没传的字段
            return this.reponseNotData<Response<Status>>(notKeys);
        }
        const user = await this._userService.Login(this._params);
        // 返回一个响应到客户端
        return user;
    }
    /** 注册 */
    @(routeParameterDecorator<RegisterRequestData>)
    public async regIster(ctx: RouterContext) {
        let notKeys: string[] | null = this.checkKeys<RegisterRequestData>(this._params, ['loginId', 'password', 'user_name']);
        if (!notKeys) {
            return this.reponseNotData<Response<Status>>(notKeys);
        }
        const result = await this._userService.Register(this._params);
        return result;
    }

    /** 检测接收账号合规 */
    private checkAccountNumber(reqData: UserResquest): boolean {
        if (!reqData) return false;

        return true;
    }
}

import { LoginRequestData, RegisterRequestData } from '../types/user';
import UserService from '../services/UserService.ts';
import routeParameterDecorator from '../decorators/routeParameterDecorator.ts';
import { Service } from 'typedi';
import { RouterContext } from 'koa-router';
import { Response } from '../types/project';
import { Status } from '../utils/Status.ts';
import Controller from './Controller.ts';

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

    @(routeParameterDecorator<LoginRequestData>)
    public async signUp(ctx: RouterContext) {
        // 路由层实际负责的
        // 查找有无字段
        let notKeys: string[] | null = this.checkKeys<LoginRequestData>(this._params, ['loginId', 'password']);
        if (!notKeys) {
            // 有没传的字段
            return this.reponseNotData<Response<Status>>(notKeys);
        }
        const user = await this._userService.signup(this._params);
        // 返回一个响应到客户端
        return user;
    }

    @routeParameterDecorator
    public async register(ctx: RouterContext, params?: RegisterRequestData) {}
}

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

    @routeParameterDecorator
    public async signUp(ctx: RouterContext, params: LoginRequestData = {} as LoginRequestData) {
        // 路由层实际负责的
        // 查找有无字段
        let notKeys: string[] | null = this.checkKeys<LoginRequestData>(params, ['loginId', 'password']);
        if (!notKeys) {
            // 有没传的字段
            return this.reponseNotData<Response<Status>>(notKeys);
        }
        const user = await this._userService.signup(params);
        // 返回一个响应到客户端
        return user;
    }

    public async register(ctx: RouterContext) {}
}

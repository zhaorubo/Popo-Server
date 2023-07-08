import { Service } from 'typedi';
import UserService from '../services/UserService.ts';
import { RouterContext } from 'koa-router';
import { Response } from '../types/project';
import { Status } from '../utils/Status.ts';
import { LoginRequestData, RegisterRequestData } from '../types/user';
import Controller from './Controller.ts';

@Service()
// 网络控制层  可以在此处验证请求是否合理
export default class UserController extends Controller {
    constructor(userService: UserService) {
        super();
        this._userService = userService;
    }
    private _userService: UserService;

    public async signUp(ctx: RouterContext) {
        // 路由层实际负责的
        const reqData: LoginRequestData = ctx.body as LoginRequestData;
        // 查找有无字段
        let notKeys: string[] | null = this.checkKeys<LoginRequestData>(reqData, ['loginId', 'password']);
        if (!notKeys) {
            // 有没传的字段
            return this.reponseNotData<Response<Status>>(notKeys);
        }
        const user = await this._userService.signup(reqData);
        // 返回一个响应到客户端
        return user;
    }

    public async register(ctx: RouterContext) {}
}

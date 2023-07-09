import { Service } from 'typedi';
import UserService from '../services/UserService.ts';
import { RouterContext } from 'koa-router';
import Controller from './Controller.ts';
import { Response, UserResponse } from '../types/project';
import { UserData } from '../types/user';
import routeParameterDecorator from '../decorators/routeParameterDecorator.ts';

// 网络控制层  可以在此处验证请求是否合理
/** 用户模块控制器 */
@Service()
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
    @routeParameterDecorator(['loginId', 'password'])
    public async logIn(ctx: RouterContext) {
        // 路由层实际负责的
        // 查找有无字段
        const user: Response<UserData> = await this._userService.login(this._params);
        // 返回一个响应到客户端
        return user;
    }

    /** 注册 */
    @routeParameterDecorator(['loginId', 'password', 'user_name'])
    public async register(ctx: RouterContext) {
        return await this._userService.register(this._params);
    }

    /** 获取用户详情 */
    @routeParameterDecorator(['user_id'])
    public async getUser(ctx: RouterContext) {
        return await this._userService.getUser(this._params);
    }

    /** 删除用户(注销) */
    @routeParameterDecorator(['user_id'])
    public async deleteUser(ctx: RouterContext): Promise<UserResponse<UserData>> {
        return await this._userService.deleteUser(this._params);
    }

    /** 获取所有用户 */
    @routeParameterDecorator([])
    public async getAllUser(ctx: RouterContext): Promise<UserResponse<UserData>> {
        return await this._userService.getAllUser();
    }

    /** 更新用户信息 */
    public async updateUser(ctx: RouterContext): Promise<UserResponse<any>> {
        return await this._userService.updateUser(this._params);
    }
}

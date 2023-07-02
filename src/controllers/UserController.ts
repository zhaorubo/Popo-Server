import { Service } from 'typedi';
import UserService from '../services/UserService.ts';

@Service()
// 网络控制层
export default class UserController {
    constructor(userService: UserService) {
        this._userService = userService;
    }
    private _userService: UserService;

    public async signUp(ctx) {
        // 路由层实际负责的
        const userDTO = ctx.body;
        const { user } = await this._userService.Signup(userDTO);
        // 返回一个响应到客户端
        return user;
    }
}

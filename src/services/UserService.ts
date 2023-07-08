import { Service } from 'typedi';
import UserModel from '../models/user/UserModel.ts';
import { Status } from '../utils/Status.ts';
import { Response } from '../types/project';
import { LoginRequestData, RegisterRequestData, UserData } from '../types/user';

// 业务逻辑层
@Service()
export default class UserService {
    constructor(userModel: UserModel) {
        this.userModel = userModel;
    }
    private userModel: UserModel;
    /** 登陆 */
    public async signup(user: LoginRequestData): Promise<Response<UserData>> {
        let data: UserData = await this.userModel.getUserDataByLoginId(user.loginId);
        return { data, code: Status.SUCCESS, prompt: Status.message };
    }
    /** 注册 */
    public async register(user: RegisterRequestData) {}
}

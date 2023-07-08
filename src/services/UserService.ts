import { Service } from 'typedi';
import UserModel from '../models/user/UserModel.ts';
import { Response } from '../types/project';
import { LoginRequestData, RegisterRequestData, UserData } from '../types/user';
import { DataTable } from '../config/datatable.ts';
import { UserResponse, UserResquest } from '../types/project';
import { Status, UserStatus } from '../utils/Status.ts';

// 业务逻辑层
@Service()
export default class UserService {
    constructor(userModel: UserModel) {
        this.userModel = userModel;
    }
    private userModel: UserModel;
    /** 登陆 */
    public async Login(user: LoginRequestData): Promise<Response<UserData>> {
        let data: UserData = await this.userModel.getUserDataByLoginId(user.loginId);
        return { data, code: Status.SUCCESS, prompt: Status.message };
    }
    /** 注册 */
    public async register(user: RegisterRequestData) {}
    public async Register(user: RegisterRequestData) {
        let result: any;
        let flag: any = this.userModel.getUserData(user, DataTable[DataTable.USERINFO_TABLE]);
        if (flag) return { result, code: UserStatus.ACCOUNT_REPEAT };
        if (!flag) {
            result = this.userModel.insUserData(user, DataTable[DataTable.USERINFO_TABLE]);
            return { result, code: Status.SUCCESS };
        }
    }
}

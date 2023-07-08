import { Service } from 'typedi';
import UserModel from '../models/user/UserModel.ts';
import { DataTable } from '../config/datatable.ts';
import { Status, UserStatus } from '../utils/Status.ts';
import { LoginRequestData, RegisterRequestData, UserData } from '../types/user';

// 业务逻辑层
@Service()
export default class UserService {
    constructor(userModel: UserModel) {
        this.userModel = userModel;
    }
    private userModel: UserModel;
    // 登陆
    public async Login(reqData: LoginRequestData) {
        let user = await this.userModel.getUserData(reqData, DataTable[DataTable.USERINFO_TABLE]);
        return { data: user, code: Status.SUCCESS, prompt: Status.message };
    }
    public async Register(subData: RegisterRequestData) {
        let result: UserData = {} as UserData;
        let flag: UserData = await this.userModel.getUserData(subData, DataTable[DataTable.USERINFO_TABLE]);
        if (flag) return { code: UserStatus.ACCOUNT_REPEAT, prompt: Status.message };
        if (!flag) {
            result = await this.userModel.insUserData(subData, DataTable[DataTable.USERINFO_TABLE]);
            return { data: result, code: Status.SUCCESS, prompt: Status.message };
        }
    }
}

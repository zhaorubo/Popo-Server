import { Service } from 'typedi';
import UserModel from '../models/user/UserModel.ts';
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
    // 登陆
    public async Login(reqData: UserResquest | Promise<any>) {
        let user = this.userModel.getUserData(reqData, DataTable[DataTable.USERINFO_TABLE]);
        return { user, code: Status.SUCCESS, prompt: Status.message };
    }
    public async Register(subData: UserResquest | Promise<any>) {
        let result: any;
        let flag: any = this.userModel.getUserData(subData, DataTable[DataTable.USERINFO_TABLE]);
        if (flag) return { result, code: UserStatus.ACCOUNT_REPEAT };
        if (!flag) {
            result = this.userModel.insUserData(subData, DataTable[DataTable.USERINFO_TABLE]);
            return { result, code: Status.SUCCESS };
        }
    }
}

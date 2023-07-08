import { LoginRequestData, RegisterRequestData, UserData } from '../types/user';
import UserModel from '../models/user/UserModel.ts';
import { DataTable } from '../config/datatable.ts';
import { UserStatus } from '../utils/Status.ts';
import { Response, UserResponse } from '../types/project';
import { Service } from 'typedi';

// 业务逻辑层
@Service()
export default class UserService {
    constructor(userModel: UserModel) {
        this.userModel = userModel;
    }
    private userModel: UserModel;
    /** 当前需要发送的数据 */
    private _data: UserData;
    // 登陆
    public async login(reqData: LoginRequestData) {
        this._data = await this.userModel.getUserData(reqData, DataTable[DataTable.USERINFO_TABLE]);
        return this.returnMsg(UserStatus.SUCCESS);
    }
    public async register(data: RegisterRequestData) {
        let flag: boolean = await this.userModel.isHasById('loginId', data.loginId);
        let error: UserResponse<UserData> = { code: UserStatus.ACCOUNT_REPEAT, prompt: UserStatus.message };
        if (flag) return error;
        if (!flag) {
            let bool: boolean = await this.userModel.insUserData(data, DataTable[DataTable.USERINFO_TABLE]);
            if (bool) {
                return { data: null, code: UserStatus.SUCCESS, prompt: UserStatus.message };
            } else {
                return error;
            }
        }
    }

    private returnMsg(code: number): UserResponse<UserData> {
        return { data: this._data, code: code, prompt: UserStatus.message };
    }
}

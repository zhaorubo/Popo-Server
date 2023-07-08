import { DeleteUserData, GetUserData, LoginRequestData, RegisterRequestData, UserData } from '../types/user';
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
    /** 用户登录 */
    public async login(reqData: LoginRequestData) {
        this.checkHasUser.call(this, reqData.loginId);
        this._data = await this.userModel.getUserData(reqData, DataTable.USERINFO_TABLE);
        return this.returnMsg(UserStatus.SUCCESS);
    }

    /** 注册用户 */
    public async register(data: RegisterRequestData) {
        this.checkHasUser.call(this, data.loginId);
        let bool: boolean = await this.userModel.insUserData(data, DataTable.USERINFO_TABLE);
        if (bool) {
            return this.returnMsg(UserStatus.SUCCESS);
        } else {
            return this.returnMsg(UserStatus.SERVER_ERROR);
        }
    }

    /** 获取用户详情 */
    public async getUser({ user_id }: GetUserData): Promise<UserData> {
        this.checkHasUser.call(this, user_id);
        return await this.userModel.getUserData({ user_id }, DataTable.USERINFO_TABLE);
    }

    /** 删除用户 */
    public async deleteUser({ user_id }: DeleteUserData) {
        this.checkHasUser.call(this, user_id);
        await this.userModel.delUserData({ user_id }, DataTable.USERINFO_TABLE);
        return this.returnMsg(UserStatus.SUCCESS);
    }

    /** 根据loginId检查是否有这个用户 */
    public async checkHasUser(loginId: string) {
        let isHas: boolean = await this.userModel.isHasById(DataTable.USERINFO_TABLE, 'loginId', loginId);
        if (isHas) {
            return this.returnMsg(UserStatus.ACCOUNT_REPEAT);
        }
    }

    /** 返回的消息 */
    private returnMsg(code: number): UserResponse<UserData> {
        return { data: this._data, code: code, prompt: UserStatus.message };
    }
}

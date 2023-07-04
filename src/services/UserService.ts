import { Service } from 'typedi';
import UserModel from '../models/user/UserModel.ts';
import { UserResponse } from '../types/project';
import { Status } from '../utils/Status.ts';

// 业务逻辑层
@Service()
export default class UserService {
    // 登陆
    constructor(userModel: UserModel) {
        this.userModel = userModel;
    }
    private userModel: UserModel;
    public async Signup(user) {
        user = this.userModel.getUserData();
        return { user, code: Status.SUCCESS };
    }
}

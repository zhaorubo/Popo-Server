/**
 * @author popo
 * 用户数据模块(数据层)
 */
import { Service } from 'typedi';
import BaseModel from '../BaseModel.ts';
import { UserData } from '../../types/user';

@Service()
export default class UserModel extends BaseModel {
    constructor(baseModel: BaseModel) {
        super();
        this._baseModel = baseModel;
    }
    private _baseModel: BaseModel;
    public async getUserDataByLoginId(loginId: string): Promise<UserData> {
        let result = await this._baseModel.where({ loginId: loginId });
        return result;
    }
}

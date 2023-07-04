/**
 * @author popo
 * 用户数据模块(数据层)
 */
import { Service } from 'typedi';
import BaseModel from '../BaseModel.ts';

@Service()
export default class UserModel extends BaseModel {
    constructor(baseModel: BaseModel) {
        super();
        this._baseModel = baseModel;
    }
    private _baseModel: BaseModel;
    public async getUserData() {
        let result = await this._baseModel.where();
        return result;
    }
}

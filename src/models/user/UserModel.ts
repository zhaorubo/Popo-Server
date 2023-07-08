/**
 * @author popo
 * 用户数据模块(数据层)
 */
import { Service } from 'typedi';
import BaseModel from '../BaseModel.ts';
import { UserResquest } from '../../types/project';

@Service()
export default class UserModel extends BaseModel {
    constructor(baseModel: BaseModel) {
        super();
        this._baseModel = baseModel;
    }
    private _baseModel: BaseModel;
    /** 插入 */
    public async insUserData(subData: any, DataTable: string) {
        let result = await this._baseModel.insert(DataTable, subData);
        return result;
    }
    /** 查询 */
    public async getUserData(reqData: Promise<any> | UserResquest, DataTable: string) {
        let result = await this._baseModel.where(DataTable, reqData);
        return result;
    }
    /** 删除 */
    public async delUserData(reqData: Promise<any> | UserResquest, DataTable: string) {
        let result = await this._baseModel.delete(DataTable, reqData);
        return result;
    }
    /** 更新 */
    public async updUserData(reqData: Promise<any> | UserResquest, subData: any, DataTable: string) {
        let result = await this._baseModel.update(DataTable, subData, reqData);
        return result;
    }
}

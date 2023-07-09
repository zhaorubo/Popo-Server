/**
 * @author popo
 * 用户数据模块(数据层)
 */
import { Service } from 'typedi';
import BaseModel from '../BaseModel.ts';
import { QueryUser, UserData } from '../../types/user';
import { DataTable } from '../../config/datatable.ts';

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
    public async getUserData(DataTable: string, reqData: QueryUser = {}): Promise<UserData> {
        let result = await this._baseModel.where(DataTable, reqData);
        return result;
    }
    public async getUserDataByLoginId(userId: number): Promise<UserData> {
        let result = await this._baseModel.where(DataTable.USERINFO_TABLE, { user_id: userId });
        return result;
    }
    /** 删除 */
    public async delUserData(reqData: QueryUser, DataTable: string) {
        let result = await this._baseModel.delete(DataTable, reqData);
        return result;
    }
    /** 更新 */
    public async updateUserData(DataTable: string, reqData: QueryUser, subData: any) {
        let result = await this._baseModel.update(DataTable, subData, reqData);
        return result;
    }
}

import { init, exec, sql, transaction } from 'mysqls';
import { Service } from 'typedi';
import { UserResquest } from '../types/project';

/** 数据库在这里接入 */
@Service()
export default class BaseModel {
    constructor() {
        init(this._config);
    }
    private _config = {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'blog_data',
        port: 3306
    };
    // 插入
    public async insert(DataTable: string, subData: any) {
        let result = await sql.table(DataTable).data(subData).insert(true).exec();
        return result;
    }
    // 查询
    public async where(DataTable: string, reqData: Promise<any> | UserResquest) {
        let result = await sql.table(DataTable).where(reqData).select(true).exec();
        return result;
    }
    // 删除
    public async delete(DataTable: string, reqData: Promise<any> | UserResquest) {
        let result = await sql.table(DataTable).where(reqData).delete(true).exec();
        return result;
    }
    // 更新
    public async update(DataTable: string, subData: any, reqData: Promise<any> | UserResquest) {
        let result = await sql.table(DataTable).data(subData).where(reqData).update(true).exec();
        return result;
    }
}

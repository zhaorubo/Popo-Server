import { init, exec, sql, transaction } from 'mysqls';
import { Service } from 'typedi';
import { QueryUser, UserDataKeys } from '../types/user';
import { ResultSetHeader } from '../types/project';

/** 数据库在这里接入 */
@Service()
export default class BaseModel {
    constructor() {
        // init(this._config);
    }
    public static init() {
        init(this._config);
    }
    private static _config = {
        host: '127.0.0.1',
        user: 'root',
        password: '200083',
        database: 'blog_data',
        port: 3306
    };
    /**
     * 插入
     * @returns(boolean)
     * 返回插入成功或者失败
     */
    public async insert(table: string, params: QueryUser): Promise<boolean> {
        try {
            await sql.table(table).data(params).insert(true).exec();
            return true;
        } catch (error) {
            return false;
        }
    }
    /** 查询 */
    public async where(table: string, params: any) {
        let result = await sql.table(table).where(params).select(true).exec();
        return result;
    }
    /**
     * 删除
     * @return 成功返回true，失败返回false
     */
    public async delete(table: string, params: any): Promise<ResultSetHeader> {
        try {
            let result = await sql.table(table).where(params).delet(true).exec();
            return result;
        } catch (error) {
            return error;
        }
    }
    /** 更新 */
    public async update(table: string, where: any, params: any) {
        let result = await sql.table(table).data(params).where(where).update(true).exec();
        return result;
    }
    /** 统计查询 */
    public async statistics(table: string, method: string, data: string) {
        return await sql[method](data).table(table).select(true).exec();
    }
    /** 唯一id查询是否存在 */
    public async isHasById(table: string, key: string, value: string): Promise<boolean> {
        let result = await sql.table(table).limit(1).where(`${key}=${value}`).select(true).exec();
        return result && !!result.length;
    }
}

import { init, exec, sql, transaction } from 'mysqls';
import { Service } from 'typedi';

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
    // 插入
    protected async insert() {}
    // 查找
    public async where(data: any) {
        let result = await sql.table('users_table').where(data).select(true).exec();
        return result;
    }
    // 删除
    protected delet() {}
    // 更新
    protected update() {}
}

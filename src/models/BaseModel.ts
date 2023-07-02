import { init, exec, sql, transaction } from 'mysqls';
import { Service } from 'typedi';

/** 数据库在这里接入 */
@Service()
export default class BaseModel {
    constructor() {
        init(this._config);
    }
    private _config = {
        host: '127.0.0.1',
        user: 'root',
        password: '200083',
        database: 'blog_data',
        port: 3306
    };
    protected async insert() {}
    public async where() {
        let result = await sql.table('category_table').where({ id: 1 }).select(true).exec();
        return result;
    }
    protected delet() {}
    protected update() {}
}

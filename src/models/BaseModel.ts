import { init, exec, sql, transaction } from 'mysqls';
import { Service } from 'typedi';

/** 数据库在这里接入 */
@Service()
export default class BaseModel {
    constructor() {
        init(this._config);
    }
    private _config = {
        host: '',
        user: '',
        password: '',
        database: ''
    };
    protected insert() {}
    protected where() {}
    protected delet() {}
    protected update() {}
}

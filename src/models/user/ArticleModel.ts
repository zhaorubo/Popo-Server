/**
 * @author popo
 * 文章数据模块(数据层)
 */
import { Service } from 'typedi';
import BaseModel from '../BaseModel.ts';

@Service()
export default class ArticleModel extends BaseModel {
    constructor(baseModel: BaseModel) {
        super();
        this._baseModel = baseModel;
    }
    private _baseModel: BaseModel;
}

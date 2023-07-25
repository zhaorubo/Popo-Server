/**
 * @author popo
 * 文章数据模块(数据层)
 */
import { Service } from 'typedi';
import BaseModel from '../BaseModel.ts';
import { DeleteArticleData, QueryArticle, UploadCommentData, DeleteCommentIdData } from '../../types/article';

@Service()
export default class ArticleModel extends BaseModel {
    constructor(baseModel: BaseModel) {
        super();
        this._baseModel = baseModel;
    }
    private _baseModel: BaseModel;
    /** 文章 */
    /** 插入 */
    public async insArtData(DataTable: string, subData: any) {
        let result = await this._baseModel.insert(DataTable, subData);
        return result;
    }
    /** 查询 */
    public async getArtData(DataTable: string, subData: QueryArticle = {}) {
        let result = await this._baseModel.where(DataTable, subData);
        return result;
    }
    /** 删除 */
    public async delArtData(DataTable: string, reqData: DeleteArticleData) {
        let result = await this._baseModel.delete(DataTable, reqData);
        return result;
    }
    /** 更新 */
    public async updArtData(DataTable: string, reqData: DeleteArticleData, subData: any) {
        let result = await this._baseModel.update(DataTable, subData, reqData);
        return result;
    }

    /** 评论 */
    /** 插入 */
    public async insComData(DataTable: string, subData: any, reqData: UploadCommentData) {
        let result = await this._baseModel.insert(DataTable, subData);
        return result;
    }
    /** 查询 */
    public async getComData(DataTable: string, subData: QueryArticle = {}) {
        let result = await this._baseModel.where(DataTable, subData);
        return result;
    }
    /** 删除 */
    public async delComData(DataTable: string, reqData: DeleteCommentIdData) {
        let result = await this._baseModel.delete(DataTable, reqData);
        return result;
    }
}

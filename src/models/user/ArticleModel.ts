/**
 * @author popo
 * 文章数据模块(数据层)
 */
import { Service } from 'typedi';
import BaseModel from '../BaseModel.ts';
import { Article } from '../../types/article';
import { DataTable } from '../../config/datatable.ts';
// import { QUERY_METHOD } from '../../types/project';

@Service()
export default class ArticleModel extends BaseModel {
    constructor(baseModel: BaseModel) {
        super();
        this._baseModel = baseModel;
    }
    private _baseModel: BaseModel;

    /** 获取所有文章 */
    public async getAll(params: any = {}): Promise<Article[]> {
        return await this._baseModel.where(DataTable.ARTICLE_TABLE, params);
    }

    /** 获取某个作者的文章 */
    public getArticleByAuthor(authorId: string): Promise<Article[]> {
        return this._baseModel.where(DataTable.ARTICLE_TABLE, { author_id: authorId });
    }

    /** 获取单个文章 */
    public async getOnce(articleId: number): Promise<Article> {
        return await this._baseModel.where(DataTable.ARTICLE_TABLE, { article_id: articleId });
    }

    /** 获取某个类目的文章 */
    public getByCategory(categoryId: number): Promise<Article[]> {
        return this._baseModel.where(DataTable.ARTICLE_TABLE, { category_id: categoryId });
    }

    /** 获取一共有多少篇文章 */
    public async getCount(): Promise<number> {
        // return await this._baseModel.statistics(DataTable.ARTICLE_TABLE, QUERY_METHOD.COUNT, '1');
        return 0;
    }

    /** 获取某个时间段的数据 */
}

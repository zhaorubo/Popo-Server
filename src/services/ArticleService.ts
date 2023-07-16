import { Service } from 'typedi';
import ArticleModel from '../models/user/ArticleModel.ts';
import { DataTable } from '../config/datatable.ts';
import { Article } from '../types/article';

// 业务逻辑层
@Service()
export default class ArticleService {
    constructor(articleModel: ArticleModel) {
        this.articleModel = articleModel;
    }
    private articleModel: ArticleModel;

    public async getAllActicle() {
        return await this.articleModel.getAll();
    }

    /** 获取单个文章 */
}

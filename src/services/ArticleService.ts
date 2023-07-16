import { Service } from 'typedi';
import ArticleModel from '../models/user/ArticleModel.ts';
import { DataTable } from '../config/Enum.ts';
import { Article } from '../types/article';
import { ArticleResponse } from '../types/project';
import { Status } from '../utils/Status.ts';

// 业务逻辑层
@Service()
export default class ArticleService {
    constructor(articleModel: ArticleModel) {
        this.articleModel = articleModel;
    }
    private articleModel: ArticleModel;

    /** 获取所有文章 */
    public async getAllActicle(): Promise<ArticleResponse<Article[]>> {
        let data: Article[] = await this.articleModel.getAll();
        return { data: data, code: Status.SUCCESS, prompt: Status.message };
    }
}

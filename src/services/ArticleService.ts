import { Service } from 'typedi';
import ArticleModel from '../models/user/ArticleModel.ts';

// 业务逻辑层
@Service()
export default class ArticleService {
    constructor(articleModel: ArticleModel) {
        this.articleModel = articleModel;
    }
    private articleModel: ArticleModel;
}

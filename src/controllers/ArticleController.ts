import { Service } from 'typedi';
import Controller from './Controller';
import { RouterContext } from 'koa-router';
import { Response, UserResponse } from '../types/project';
import { UploadArticleData, ArticleData } from '../types/article';
import ArticleService from '../services/ArticleService';
import routeParameterDecorator from '../decorators/routeParameterDecorator.ts';

/**
 * 文章模块控制器
 */
@Service()
export default class ArticleController extends Controller {
    constructor(articleService: ArticleService) {
        super();
        this._articleService = articleService;
    }
    private _articleService: ArticleService;
    public _params: any;
    public set params(val: any) {
        this._params = val;
    }

    /** 创建文章 */
    @routeParameterDecorator(['article_title', 'article_class', 'article_content', 'article_author', 'article_cover', 'status'])
    public async artCreate(ctx: RouterContext) {
        const article: Response<UploadArticleData> = await this._articleService.ArtCreate(this._params);
        return article;
    }

    /** 删除文章 */
    @routeParameterDecorator(['article_id'])
    public async artDelete(ctx: RouterContext): Promise<UserResponse<ArticleData>> {
        return await this._articleService.ArtDelete(this._params);
    }

    /** 更新文章 */
    @routeParameterDecorator(['article_id', 'article_title', 'article_class', 'article_content', 'article_author', 'article_cover', 'status'])
    public async artUpdate(ctx: RouterContext): Promise<UserResponse<ArticleData>> {
        return await this._articleService.ArtUpdate(this._params);
    }

    /** 获取单个文章 */
    @routeParameterDecorator(['article_id'])
    public async artGet(ctx: RouterContext): Promise<UserResponse<ArticleData>> {
        return await this._articleService.ArtGet(this._params);
    }

    /** 获取所有文章 */
    @routeParameterDecorator([])
    public async artGetAll(ctx: RouterContext): Promise<UserResponse<ArticleData>> {
        return await this._articleService.ArtGetAll();
    }

    /** 创建评论 */
    @routeParameterDecorator(['article_id', 'comment_content', 'user_name', 'loginId', 'headPortrait'])
    public async comCreate(ctx: RouterContext) {
        return await this._articleService.ComCreate(this._params);
    }

    /** 删除评论 */
    @routeParameterDecorator(['comment_id', 'article_id'])
    public async comDelete(ctx: RouterContext) {
        return await this._articleService.ComDelete(this._params);
    }

    /** 获取所有评论列表 */
    @routeParameterDecorator([])
    public async comGetAll(ctx: RouterContext) {
        return await this._articleService.ComGetAll(this._params);
    }
}

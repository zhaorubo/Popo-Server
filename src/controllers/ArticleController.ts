import { Service } from 'typedi';
import Controller from './Controller.ts';
import ArticleService from '../services/ArticleService.ts';
import routeParameterDecorator from '../decorators/routeParameterDecorator.ts';
import { RouterContext } from 'koa-router';
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

    @routeParameterDecorator()
    public async getAllActicle(ctx: RouterContext) {
        return await this._articleService.getAllActicle();
    }
}

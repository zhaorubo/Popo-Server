import { Service } from 'typedi';
import Controller from './Controller';
import ArticleService from '../services/ArticleService';
/**
 * 文章模块控制器
 */
@Service()
export default class ArticleController extends Controller {
    constructor(articleService: ArticleService) {
        super();
    }
    private _articleService: ArticleService;
    public _params: any;
    public set params(val: any) {
        this._params = val;
    }
}

import { Service } from 'typedi';
import ArticleModel from '../models/user/ArticleModel.ts';
import { DataTable } from '../config/datatable.ts';
import { ArticleStatus } from '../utils/Status.ts';
import { Response, UserResponse } from '../types/project';
import { ArticleData, UploadArticleData, GetArticleData, DeleteArticleData, DeleteCommentData, UploadCommentData } from '../types/article';

// 业务逻辑层
@Service()
export default class ArticleService {
    constructor(articleModel: ArticleModel) {
        this.articleModel = articleModel;
    }
    private articleModel: ArticleModel;
    private _data: ArticleData;

    /** 创建文章 */
    public async ArtCreate(reqData: UploadArticleData) {
        let bool: boolean = await this.articleModel.insArtData(DataTable.ARTICLE_TABLE, reqData);
        if (bool) {
            return this.returnMsg(ArticleStatus.SUCCESS);
        } else {
            return this.returnMsg(ArticleStatus.SERVER_ERROR);
        }
    }
    /** 删除文章 */
    public async ArtDelete(reqData: DeleteArticleData) {
        this.checkHasArt.call(this, reqData.article_id)
        let bool: boolean = await this.articleModel.delArtData(DataTable.ARTICLE_TABLE, { "article_id": reqData.article_id });
        if (bool) {
            return this.returnMsg(ArticleStatus.SUCCESS);
        } else {
            return this.returnMsg(ArticleStatus.SERVER_ERROR);
        }
    }
    /** 更新文章 */
    public async ArtUpdate(reqData: ArticleData) {
        this.checkHasArt.call(this, reqData.article_id)
        this._data = await this.articleModel.updArtData(DataTable.ARTICLE_TABLE, { "article_id": reqData.article_id }, reqData);
        return this.returnMsg(ArticleStatus.SUCCESS);
    }
    /** 获取单个文章 */
    public async ArtGet(reqData: GetArticleData) {
        this.checkHasArt.call(this, reqData.article_id)
        this._data = await this.articleModel.getArtData(DataTable.ARTICLE_TABLE, { "article_id": reqData.article_id });
        return this.returnMsg(ArticleStatus.SUCCESS);
    }
    /** 获取所有文章 */
    public async ArtGetAll() {
        this._data = await this.articleModel.getArtData(DataTable.ARTICLE_TABLE);
        return this.returnMsg(ArticleStatus.SUCCESS);
    }
    /** 创建评论 */
    public async ComCreate(reqData: UploadCommentData) {
        this.checkHasArt.call(this, reqData.article_id)
        let bool: boolean = await this.articleModel.insComData(DataTable.COMMENT_TABLE, { "article_id": reqData.article_id }, reqData);
        if (bool) {
            return this.returnMsg(ArticleStatus.SUCCESS);
        } else {
            return this.returnMsg(ArticleStatus.SERVER_ERROR);
        }
    }
    /** 删除评论 */
    public async ComDelete(reqData: DeleteCommentData) {
        this.checkHasArt.call(this, reqData.article_id)
        let bool: boolean = await this.articleModel.delComData(DataTable.COMMENT_TABLE, { "comment_id": reqData.article_id });
        if (bool) {
            return this.returnMsg(ArticleStatus.SUCCESS);
        } else {
            return this.returnMsg(ArticleStatus.SERVER_ERROR);
        }
    }
    /** 获取所有评论列表 */
    public async ComGetAll(reqData: GetArticleData) {
        this.checkHasArt.call(this, reqData.article_id)
        this._data = await this.articleModel.getComData(DataTable.COMMENT_TABLE, { "article_id": reqData.article_id });
        return this.returnMsg(ArticleStatus.SUCCESS);
    }

    /** 根据article_id检查是否有文章 */
    public async checkHasArt(article_id: number) {
        let isHas: boolean = await this.articleModel.isHasById(DataTable.ARTICLE_TABLE, 'article_id', article_id);
        if (isHas) {
            return this.returnMsg(ArticleStatus.ACCOUNT_REPEAT);
        }
    }

    /** 返回的消息 */
    private returnMsg(code: number): UserResponse<ArticleData> {
        return { data: this._data, code: code, prompt: ArticleStatus.message };
    }
}

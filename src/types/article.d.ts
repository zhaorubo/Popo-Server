export declare type RegArticleData = {

}
export declare type GetArticleData = {
    article_id: number;
}
export declare type DeleteArticleData = {
    article_id: number;
}
/** 文章上传数据 */
export declare type UploadArticleData = {
    article_title: string;
    article_class: string;
    article_content: string;
    article_author: string;
    article_cover: string;
    status: number;
}
export declare type QueryArticle = Partial<ArticleData>;
/** 获取文章数据 */
export declare type ArticleData = {
    article_id: number;
    article_title: string;
    article_class: string;
    article_content: string;
    article_author: string;
    article_cover: string;
    status: number;
}
/** 评论上传数据 */
export declare type UploadCommentData = {
    article_id: number;
    comment_content: string;
    user_name: string;
    loginId: string;
    headPortrait: string;
}
/** 获取评论数据 */
export declare type DeleteCommentData = {
    comment_id: number;
    article_id: number;
}
export declare type DeleteCommentIdData = {
    comment_id: number;
}
export declare type QueryComment = Partial<CommentData>;

/** 评论数据 */
export declare type CommentData = {
    comment_id: number;
    article_id: number;
    comment_content: string;
    user_name: string;
    loginId: string;
    headPortrait: string;
}
export declare type SubData = {}

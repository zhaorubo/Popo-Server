/** 路由的枚举 */
export enum UserApi {
    /** 登陆 */
    LOGIN = '/users/login',
    /** 注册 */
    REGISTER = '/users/register',
    /** 获取用户列表 */
    LIST_USERS = '/users',
    /** 获取用户详情 */
    GET_USER = '/users/detial',
    /** 更新用户信息 */
    UPDATE_USER = '/users/update',
    /** 删除用户 */
    DELETE_USER = '/users/delete',
    /** 登出 */
    LOGOUT = '/users/logout'
}

export enum ArticleApi {
    /** 获取全部文章 */
    GETALL_ARTICLE = '/article/getall',
    /** 获取单个文章 */
    GET_ARTICLE = '/article/get',
    /** 创建文章 */
    CREATE_ARTICLE = '/article/create',
    /** 更新文章 */
    UPDATE_ARTICLE = '/article/update',
    /** 删除文章 */
    DELETE_ARTICLE = '/article/delete',
    /** 获取所有评论列表 */
    GETALL_COMMENTS = '/comment/getall',
    /** 创建评论 */
    CREATE_COMMENT = '/comment/create',
    /** 删除评论 */
    DELETE_COMMENT = '/comment/delete'
}

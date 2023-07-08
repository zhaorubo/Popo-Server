/** 路由的枚举 */
export enum UserApi {
    /** 登录 */
    LOGIN = '/login',
    /** 注册 */
    REGISTER = '/register',
    /** 退出登录 */
    QUIT = '/quit',
    /** 注销账号 */
    LOGOUT = '/logout',
    /** 获取单个用户信息 */
    OBTAIN_USERINFO_SINGLE = '/obtain/userinfo/single',
    /** 获取所有用户信息 */
    OBTAIN_USERINFO_ALL = '/obtain/userinfo/all',

}

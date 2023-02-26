const request = require('../server/index');
const handler = require('../handler/handler');
const interface = require('../interface/interface');

/**
 * 所有接口监听在这里
 */
// 获取所有类目
request[interface.GET_CATEGORY.method](interface.GET_CATEGORY.path, handler.getCategory);
// 创建类目
request[interface.CREATE_CATEGORY.method](interface.CREATE_CATEGORY.path, handler.createCategory);
// 删除类目
request[interface.DELETE_CATEGORY.method](interface.DELETE_CATEGORY.path, handler.deleteCategory);
// 获取所有文章
request[interface.GET_ARTICLE.method](interface.GET_ARTICLE.path, handler.getArticle);
// 创建文章
request[interface.CREATE_ARTICLE.method](interface.CREATE_ARTICLE.path, handler.createArticle);
// 删除文章
request[interface.DELETE_ARTICLE.method](interface.DELETE_ARTICLE.path, handler.deleteArticle);
// 修改文章
request[interface.CHANGE_ARTICLE.method](interface.CHANGE_ARTICLE.path, handler.changeArticle);
// 获取所有导航栏
request[interface.GET_NAVIGATION.method](interface.GET_NAVIGATION.path, handler.getNavigation);
// 创建导航栏
request[interface.CREATE_NAVIGATION.method](interface.CREATE_NAVIGATION.path, handler.createNavigation);
// 修改导航栏
request[interface.CHANGE_NAVIGATION.method](interface.CHANGE_NAVIGATION.path, handler.changeNavigation);
// 删除导航栏
request[interface.DELETE_NAVIGATION.method](interface.DELETE_NAVIGATION.path, handler.deleteNavigation);
// 获取某个类目的文章
request[interface.GET_ARTICLEINCATEGORY.method](interface.GET_ARTICLEINCATEGORY.path, handler.getArticleInCategory);
// 注册
request[interface.REGISTERED.method](interface.REGISTERED.path, handler.registered);
// 登陆
request[interface.LOGIN.method](interface.LOGIN.path, handler.login);

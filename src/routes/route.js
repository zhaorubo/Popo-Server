const Router = require('koa-router');
const config = require('../../config/config.default');
const router = new Router({ prefix: config.BASE_ROOT });
router.allowedMethods({
    throw: true, // 抛出错误，代替设置响应头状态
    notImplemented: () => '不支持当前请求所需要的功能',
    methodNotAllowed: () => '不支持的请求方式'
});


module.exports = router;

// 注册路由
require('./user.route');
require('./article.route');
require('./upload.route');
require('./category.route');
require('./search.route')

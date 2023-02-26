const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const checkToken = require('./checkToken');

class Server {
    _instance;
    _app;
    _router;
    _config = {
        // prefix: '/mall'
    };
    constructor() {
        this.initRouter();
        this.initServer();
    }
    static instance() {
        if (!this._instance) {
            this._instance = new Server();
        }
        return this._instance;
    }
    get(path, handler) {
        this._router.get(path, handler);
    }
    put(path, handler) {
        this._router.put(path, handler);
    }
    post(path, handler) {
        this._router.post(path, handler);
    }
    delete(path, handler) {
        this._router.delete(path, handler);
    }
    initRouter() {
        this._router = new Router(this.config);
    }
    initServer() {
        this._app = new Koa();
        this._app.listen(3001, () => {
            console.log('一开始监听3001端口');
        });
        // 验证token的中间件函数
        this._app.use(checkToken);
        this._app.use(bodyparser());
        this._app.use(this._router.routes());
        this._app.use(
            this._router.allowedMethods({
                throw: true, // 抛出错误，代替设置响应头状态
                notImplemented: () => '不支持当前请求所需要的功能',
                methodNotAllowed: () => '不支持的请求方式'
            })
        );
    }
    use(handler) {
        this._app.use(handler);
    }
}

module.exports = Server.instance();

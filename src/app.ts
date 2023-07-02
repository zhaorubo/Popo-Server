import 'reflect-metadata';
import Koa from 'koa';
import koaBodyParser from 'koa-bodyparser';
import router from './routes/routes.ts';
class App {
    constructor() {
        this.init();
    }
    private _app: Koa;
    private init(): void {
        try {
            this._app = new Koa();
            this._app.use(router.routes());
            this._app.use(koaBodyParser());
            console.log('服务初始化成功');
        } catch {
            console.log('服务初始化失败');
        }
    }
    public start(): void {
        this._app.listen(3001);
        console.log('正在监听3001端口');
    }
}

/** Start */
new App().start();

import 'reflect-metadata';
import Koa from 'koa';
import koaBodyParser from 'koa-bodyparser';
import router from './routes/routes.ts';
import CreateTable from './utils/CreateTable.ts';
import BaseModel from './models/BaseModel.ts';
class App {
    constructor() {
        this.init();
    }
    private _app: Koa;
    private init(): void {
        try {
            this._app = new Koa();
            this._app.use(koaBodyParser());
            // 初始化创建表
            BaseModel.init();
            // 创建表
            CreateTable.ins().create();
            this._app.use(router.routes());
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

const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const { APP_PORT } = require('../config/config.default');
const userRouter = require('../src/routes/route');
const checkToken = require('../src/middleware/checkToken');
const staticFiles = require('koa-static');
const path = require('path');
const app = new Koa();

// token检查中间件
app.use(checkToken);
// 设置静态资源访问
app.use(staticFiles(path.join(__dirname, '../public')));
// 解析body请求体中间件
app.use(
    bodyparser({
        multipart: true
    })
);
// 路由表中间件
app.use(userRouter.routes());

app.listen(APP_PORT, () => {
    console.log(`server is running on ${APP_PORT}`);
});

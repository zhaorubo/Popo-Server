import 'reflect-metadata';
import Koa from 'koa';
import koaBodyParser from 'koa-bodyparser';
import router from './routes/routes.ts';
const app = new Koa();
app.use(router.routes());
app.use(koaBodyParser());

app.listen(3001);

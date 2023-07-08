import { RouterContext } from 'koa-router';

/**
 * 此装饰器用于将路由的参数提取出用户请求的参数
 * @return1 原参数
 * @return2 筛选过后的参数
 * @return3 其他参数
 */
export default function routeParameterDecorator(target: any, methodName: string, descriptor: PropertyDescriptor): any {
    const originalMethod = descriptor.value;
    descriptor.value = function (ctx: RouterContext, ...args: any[]) {
        // 过滤参数
        let params = { ...ctx.params, ...(ctx.body as object) };
        console.log('Original method called with args:', params, ctx, args);
        return originalMethod.call(this, ctx, params, args);
    };
}

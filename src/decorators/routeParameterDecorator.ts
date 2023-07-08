import { RouterContext } from 'koa-router';

/**
 * 此装饰器用于将路由的参数提取出用户请求的参数
 * 参数可以在函数内接收，也可以在类中的_params字段中读取
 * @return1 原参数
 * @return2 筛选过后的参数
 * @return3 其他参数
 */
export default function routeParameterDecorator<T>(target: any, methodName: string, descriptor: PropertyDescriptor): any {
    const originalMethod = descriptor.value;
    descriptor.value = function (ctx: RouterContext, ...args: any[]) {
        // 过滤参数
        let params: T = { ...ctx.params, ...(ctx.body as object) } as T;
        target['params'] = params;
        console.log('Original method called with args:', params, ctx, args);
        return originalMethod.call(this, ctx, params, args);
    };
}

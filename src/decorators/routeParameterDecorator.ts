import { RouterContext } from 'koa-router';

/**
 * 此装饰器用于将路由的参数提取出用户请求的参数
 * 参数可以在函数内接收，也可以在类中的_params字段中读取
 * @return1 原参数
 * @return2 筛选过后的参数
 * @return3 其他参数
 */
export default function routeParameterDecorator(checkKeys?: string[]): any {
    return function (ins: any, methodName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (ctx: RouterContext, ...args: any[]) {
            // 过滤参数
            let params = { ...ctx.params, ...(ctx.body as object), ...ctx.query };
            // 在类中注入过滤后的参数
            ins['params'] = params;
            // 检查参数是否合格
            if (ins.checkUserKeys) {
                let checkRes = ins.checkUserKeys(checkKeys || []);
                if (checkRes) return checkRes;
            }
            // 执行原方法
            return originalMethod.call(this, ctx, params, args);
        };
    };
}

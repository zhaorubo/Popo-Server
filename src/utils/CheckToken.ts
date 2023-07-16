import { RouterContext } from 'koa-router';
import { UserStatus } from './Status.ts';
import jwt from 'jsonwebtoken';

/** 验证token */
export default async function checkToken(ctx: RouterContext, next: Function) {
    let token: string = ctx.header.authorization as string;
    if (ctx.URL.pathname === '/users/login') return next();
    if (!token) {
        ctx.body = { status: UserStatus.NOT_MEET_WITH, message: '请携带token' };
        return;
    }
    // token验证
    await jwt.verify(token, 'jsonWebToken', (err: jwt.VerifyErrors, decoded: jwt.JwtPayload) => {
        if (!err) return next();
        return (ctx.body = { status: UserStatus.TOKEN_ERROR, message: UserStatus.message });
    });
}

import { RouterContext } from 'koa-router';
import { Status } from './Status.ts';
import jwt from 'jsonwebtoken';

/** 验证token */
export default function checkToken(ctx: RouterContext, next: Function) {
    console.log();
    let token: string = ctx.header.authorization as string;
    if (!token) {
        ctx.body = { status: Status.NOT_MEET_WITH, message: '请携带token' };
        return;
    }
    // token验证
    jwt.verify(token, 'jsonWebToken', (err: jwt.VerifyErrors, decoded: jwt.JwtPayload) => {
        if (!err) next();
    });
}

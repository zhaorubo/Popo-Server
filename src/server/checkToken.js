const jwt = require('jsonwebtoken');
async function check(ctx, next) {
    // split('?')[0]把字符串分割成字符串数组——拿到url值
    let url = ctx.url;
    console.log(ctx.request.headers);
    // 如果是登陆页面和注册页面就不需要验证token了
    if (url === '/login' || url === '/registered') {
        await next();
    } else {
        //获取到token
        console.log(ctx.request.headers['authorization']);
        let token = ctx.request.headers['authorization'].split('Bearer ')[1];
        if (token) {
            //  如果有token的话解析
            const tokenItem = jwt.verify(token, 'screct');
            //    把创建时间和过期时间析构出来
            const { time, timeout } = tokenItem;
            // 拿到当前时间
            let NewTime = new Date().getTime();
            if (NewTime - time <= timeout) {
                // 说明没过期
                await next();
            } else {
                ctx.body = {
                    status: 405,
                    message: 'token 已过期，请重新登陆'
                };
            }
        } else {
            ctx.body = {
                status: 405,
                message: '请带上token'
            };
        }
    }
}
module.exports = check;

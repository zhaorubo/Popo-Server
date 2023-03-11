const jwt = require('jsonwebtoken');
const { isUndefined } = require('lodash');
const interface = require('../interface/interface');
const { changeStateAndReturnBody } = require('../utils/utils');

function checkUrl(url) {
    url = url.replace('/popo', '').split('?')[0];
    for (const key in interface) {
        if (interface[key] === url) {
            return true;
        }
    }
    return false;
}

async function check(content, next) {
    if (/^\/uploads/g.test(content.url)) {
        await next();
        console.log('静态资源访问路径');
        return;
    }
    if (!checkUrl(content.url)) {
        changeStateAndReturnBody.call(content, 404, {
            message: '无效的请求地址'
        });
        return;
    }
    const white = ['/popo/login', '/popo/registered'].includes(content.url);
    let token = content.request.headers['authorization'];
    if (white) {
        await next();
        return;
    }
    if (isUndefined(token) || token.length < 10) {
        changeStateAndReturnBody.call(content, 400, {
            message: '请带上token'
        });
        return;
    }
    token = token.split('Bearer ')[1];
    try {
        const { time, timeout } = jwt.verify(token, 'screct');
        let NewTime = new Date().getTime();
        if (NewTime - time <= timeout) {
            await next();
            return;
        } else {
            changeStateAndReturnBody.call(content, 400, {
                message: 'token 已过期，请重新登陆'
            });
            return;
        }
    } catch (error) {
        if (error.message == 'invalid token') {
            changeStateAndReturnBody.call(content, 301, {
                message: '无效的token invaild token'
            });
        }
    }
}

module.exports = check;

const { throttle } = require('lodash');
const { isEmpty, isObject, isArray } = require('lodash');
const fs = require('fs'); // 导入 fs 模块
const path = require('path'); // 导入 path 模块

/**
 *  生成文件夹
 * @param {String} pathname 一个路径
 * @param {Function} callback  回调函数 null则成功 否则返回错误
 * mkdirs('../../picture' + fileName, callback)
 *
 */

function mkdirs(filePath) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path.join(__dirname, `../../public/uploads/${filePath}`), { recursive: true }, err => {
            if (err) {
                reject(err);
            } else {
                console.log('dir cteate !');
                resolve(null);
            }
        });
    });
}

/**
 *  对象转换数组 [key=value]
 * 用于SQL连续 AND 查询
 * @param {Object:{key,value}} obj 对象
 * @returns
 */
function selectKeysAndValues(data, act) {
    let res = { ...data };
    if (res.id) delete res.id;
    let result = [];
    let keys = Object.keys(res);
    let values = Object.values(res);
    keys.forEach((el, i) => {
        if (i !== 0) {
            result.push(`${act ? act + ' ' : ''}${el}=${values[i]}`);
        } else {
            result.push(`${el}=${values[i]}`);
        }
    });
    return result;
}

/**
 * 改变状态码返回数据到客户端
 * @param {number} thisState 状态码
 * @param {Object} body 需要返回的数据
 */
function changeStateAndReturnBody(thisState, body) {
    this.status = thisState;
    this.body = {
        code: thisState,
        ...body
    };
}

/**
 * 抛出一个类型错误
 * @param {string} message 需要提示的文本
 */
function throwTypeError(message) {
    throw new TypeError(message);
}
/**
 * 抛出一个参数范围错误
 * @param {string} message 需要提示的文本
 */
function throwRangeError(message) {
    throw new RangeError(message);
}

/**
 *
 * @param {Object} userParams 用户的参数
 * @param {Array} hopeParams 希望用户的参数
 * @return {Boolean}
 */
function whetherHave(userParams, hopeParams) {
    if (isEmpty(userParams) && isEmpty(hopeParams)) {
        isObject(userParams) || throwTypeError('这必须是一个对象');
        isArray(hopeParams) || throwTypeError('这必须是一个数组');
    }
    for (let i = 0; i < hopeParams.length; i++) {
        let bool = userParams.hasOwnProperty(hopeParams[i]);
        bool || throwRangeError(`缺少属性：${hopeParams[i]}`);
        if (!bool) return false;
    }
    return true;
}

/**
 * 删除某一个包下面的需要符合格式的文件。
 * @param  {String} url  文件路径，绝对路径
 * @param  {String} name 需要删除的文件名称
 * @return {Null}
 * @author huangh 20170123
 */
function deleteFile(url, name) {
    var files = [];

    if (fs.existsSync(url)) {
        //判断给定的路径是否存在

        files = fs.readdirSync(url); //返回文件和子目录的数组

        files.forEach(function (file, index) {
            var curPath = path.join(url, file);

            if (fs.statSync(curPath).isDirectory()) {
                //同步读取文件夹文件，如果是文件夹，则函数回调
                deleteFile(curPath, name);
            } else {
                if (file.indexOf(name) > -1) {
                    //是指定文件，则删除
                    fs.unlinkSync(curPath);
                    console.log('删除文件：' + curPath);
                }
            }
        });
    } else {
        console.log('给定的路径不存在！');
    }
}

/**
 * 生成搜索查询的sql数据
 * @param {string} params 查询的字符串
 * @param {Array} data 需要查询字段
 */
function initParams(params, data) {
    let result = [];
    data.forEach(item => {
        result.push({
            [item]: {
                like: `%${params.query}%`
            }
        });
    });
    return result;
}

/**
 * 给对象去重
 * @param {Array} arr 需要去重的数组
 */
function unique(arr) {
    let map = new Map();
    for (const item of arr) {
        if (!map.has(item.id)) {
            map.set(item.id, item);
        }
    }
    return [...map.values()];
}

/**
 * 查询是否是查询参参数还是请求体参数
 * @param {Number} type 0为判断查询参 1为判断请求体
 */
function paramsOrBody(type) {
    let params = this.query;
    let body = this.request.body;
    if (!isEmpty(params) && !type) {
        throwTypeError('必须使用查询参传参');
    }
    if (isEmpty(body) && type) {
        throwTypeError('必须使用请求体传参');
    }
}

module.exports = {
    selectKeysAndValues,
    changeStateAndReturnBody,
    throwTypeError,
    throwRangeError,
    whetherHave,
    deleteFile,
    initParams,
    unique,
    paramsOrBody,
    mkdirs
};

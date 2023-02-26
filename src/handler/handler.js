const instance = require('../sql');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

const getTable = function (table, data) {
    return `SELECT * FROM ${table}`;
};

/**
 *
 * @param {需要判断的数据} type
 * @returns  data type
 */
const isType = function (type) {
    return Object.prototype.toString.call(type);
};

/**
 *
 * @param {需要转换sql条件语句的对象} data
 * @returns String
 */
const objToSQLParams = function (data) {
    // 里面是每一个    需要保存字符串数据的   数组
    const dataTypeIsString = [];
    // 对象转 key=value 形式数组
    const sqlSearchStrArray = [];
    // SQL条件语句
    let sqlStr = '';
    for (const key in data) {
        if (Object.prototype.toString.call(data[key]) === '[object String]') {
            dataTypeIsString.push(key);
        }
        sqlSearchStrArray.push(`${key}=${data[key]}`);
    }
    // 转换SQL语句
    sqlSearchStrArray.forEach((item, index) => {
        const pair = item.split('=');
        const len = sqlSearchStrArray.length - 1;
        if (dataTypeIsString.includes(pair[0])) {
            sqlStr += `${item.replace(pair[1], `'${pair[1]}'`)}${index == len ? '' : ','}`;
        } else {
            sqlStr += item + (index == len ? '' : ',');
        }
    });
    return sqlStr.replace(/,/g, ' AND ');
};

/**
 *
 * @param {需要转换sqlvalues参数的对象} data
 * @returns
 */
const objToSQLValues = function (data) {
    let sqlParams = '';
    const values = [];
    for (const key in data) {
        values.push(data[key]);
    }
    values.forEach((item, index) => {
        if (Object.prototype.toString.call(item) === '[object Object]' && item.type === 1) {
            sqlParams += `STR_TO_DATE('${item.time}','%Y-%m-%d %H:%i:%s')${index === values.length - 1 ? '' : ','}`;
        } else if (Object.prototype.toString.call(item) === '[object String]') {
            sqlParams += `'${item}'${index === values.length - 1 ? '' : ','}`;
        } else if (Object.prototype.toString.call(item) === '[object Number]') {
            sqlParams += `${item}${index === values.length - 1 ? '' : ','}`;
        } else {
            if (!Object.prototype.toString.call(item) === '[object Object]') {
                sqlParams += item;
            } else {
                sqlParams += `${item}${index === values.length - 1 ? '' : ','}`;
            }
        }
    });
    return sqlParams;
};

const insertInto = function (table, data) {
    const sqlString = objToSQLValues(data);
    return `INSERT INTO ${table} (${Object.keys(data)}) VALUES(${sqlString})`;
};

/**
 *
 * @param {需要更新的表} table
 * @param {需要更新的表字段} data
 * @param {需要更新的某条数据id}
 * @returns
 */
const updateTable = function (table, data, id) {
    let sql = objToSQLParams(data).replace(/ AND /g, ',');
    return `UPDATE ${table} SET ${sql} WHERE id=${id}`;
};

const deleteItem = function (table, data) {
    const sqlStr = objToSQLParams(data);
    return `DELETE FROM ${table} WHERE ${sqlStr}`;
};
// 响应处理函数
module.exports = {
    // 获取类目
    async getCategory(ctx) {
        // try {
        let res = await instance.query(getTable('category_table'));
        delete res.tips;
        // console.log(res.result[0].active);
        console.log(JSON.parse(res.result[0].active));
        ctx.body = {
            code: 200,
            data: res
            //     };
            // } catch (error) {
            //     ctx.body = {
            //         code: 400,
            //         tips: '请求失败'
            //     };
        };
    },
    // 创建类目
    async createCategory(ctx) {
        try {
            const { active, label } = ctx.request.body;
            await instance.query(
                insertInto('category_table', {
                    active,
                    label,
                    create_date: {
                        type: 1,
                        time: dayjs().format('YYYY-MM-DD HH:MM:s')
                    },
                    article_num_total: 0
                })
            );
            ctx.body = {
                code: 200,
                tips: '创建成功'
            };
        } catch (error) {
            ctx.body = {
                code: 400,
                tips: '请求失败'
            };
        }
    },
    // 删除类目
    async deleteCategory(ctx) {
        try {
            const conditionsParams = ctx.query;
            let sql = deleteItem('category_table', conditionsParams);
            let res = await instance.query(sql);
            ctx.body = { code: 200, tips: '删除成功' };
        } catch (error) {
            ctx.body = {
                code: 400,
                tips: '请求失败'
            };
        }
    },
    // 获取所有文章
    async getArticle(ctx) {
        try {
            let res = await instance.query(getTable('article_table'));
            ctx.body = { code: 200, data: res.result };
        } catch (error) {
            ctx.body = { code: 400, tips: '请求失败' };
        }
    },
    // 创建文章
    async createArticle(ctx) {
        try {
            const body = ctx.request.body;
            await instance.query(
                insertInto('article_table', {
                    ...body,
                    create_date: {
                        type: 1,
                        time: dayjs().format('YYYY-MM-DD HH:MM:s')
                    }
                })
            );
            ctx.body = {
                code: 200,
                tips: '创建成功'
            };
        } catch (error) {
            ctx.body = { code: 400, tips: '请求失败' };
        }
    },
    // 删除文章
    async deleteArticle(ctx) {
        try {
            const data = ctx.query;
            let res = await instance.query(deleteItem('article_table', data));
            ctx.body = {
                code: 200,
                tips: '删除成功'
            };
        } catch (error) {
            ctx.body = { code: 400, tips: '请求失败' };
        }
    },
    // 修改文章
    async changeArticle(ctx) {
        try {
            const query = ctx.query;
            const sql = updateTable(
                'article_table',
                {
                    ...query,
                    update_date: dayjs().format('YYYY-MM-DD HH:MM:s')
                },
                query.id
            );
            await instance.query(sql);
            ctx.body = {
                code: 200,
                tips: '修改成功'
            };
        } catch (error) {
            ctx.body = { code: 400, tips: '请求失败' };
        }
    },
    // 获取所有导航栏
    async getNavigation() {
        try {
            let res = await instance.query(getTable('navigation_table'));
            delete res.tips;
            ctx.body = {
                code: 200,
                data: res
            };
        } catch (error) {
            ctx.body = { code: 400, tips: '请求失败' };
        }
    },
    // 创建导航栏
    async createNavigation(ctx) {
        try {
            const body = ctx.request.body;
            await instance.query(
                insertInto('navigation_table', {
                    ...body,
                    create_date: {
                        type: 1,
                        time: dayjs().format('YYYY-MM-DD HH:MM:s')
                    }
                })
            );
            ctx.body = {
                code: 200,
                tips: '创建成功'
            };
        } catch (error) {
            ctx.body = { code: 400, tips: '请求失败' };
        }
    },
    // 修改导航栏
    async changeNavigation(ctx) {
        try {
            const query = ctx.query;
            const sql = updateTable(
                'navigation_table',
                {
                    ...query,
                    update_date: dayjs().format('YYYY-MM-DD HH:MM:s')
                },
                query.id
            );
            await instance.query(sql);
            ctx.body = {
                code: 200,
                tips: '修改成功'
            };
        } catch (error) {
            ctx.body = { code: 400, tips: '请求失败' };
        }
    },
    // 删除导航栏
    async deleteNavigation(ctx) {
        try {
            const data = ctx.query;
            await instance.query(deleteItem('navigation_table', data));
            ctx.body = {
                code: 200,
                tips: '删除成功'
            };
        } catch (error) {
            ctx.body = { code: 400, tips: '请求失败' };
        }
    },

    // 获取某个类目的文章
    async getArticleInCategory(ctx) {
        const query = ctx.query;
        try {
            const params = objToSQLParams({
                category: 'Vue'
            });
            const res = await instance.query(`SELECT * FROM article_table WHERE ${params}`);
            ctx.body = {
                code: 200,
                tips: '请求成功'
            };
        } catch (error) {
            ctx.body = { code: 400, tips: '请求失败' };
        }
    },

    /**
     *
     * 注册
     * 需要的参数：
     * account:账号
     * password:密码
     * user_name:账号名
     */
    async registered(ctx) {
        try {
            const data = ctx.request.body;
            const randomNumber = Math.floor(Math.random() * 400);
            const defaultAccountData = {
                create_date: {
                    type: 1,
                    time: dayjs().format('YYYY-MM-DD HH:MM:s')
                },
                article: null,
                user_head: '',
                author_id: randomNumber,
                account_state: 1,
                ...data
            };
            const params = objToSQLParams({
                account: data.account
            });
            const res = await instance.query(`SELECT * FROM login_table WHERE ${params}`);
            if (res.result.length !== 0) {
                ctx.body = {
                    code: 200,
                    tips: '请勿重新注册'
                };
                return;
            }
            const sql = insertInto('login_table', defaultAccountData);
            await instance.query(sql);
            ctx.body = {
                code: 200,
                tips: '注册成功',
                user_name: data.user_name,
                user_id: data.user_id,
                account: data.account,
                password: data.password
            };
        } catch (error) {
            ctx.body = { code: 400, tips: '登陆失败' };
        }
    },

    // 登陆
    async login(ctx) {
        const data = ctx.request.body;
        const params = objToSQLParams(data);
        const res = await instance.query(`SELECT * FROM login_table WHERE ${params}`);
        const article = await instance.query(`SELECT * FROM article_table WHERE ${res.result[0].author_id}`);
        if (res.result.length === 0) {
            ctx.body = {
                code: 200,
                tips: '账号或者密码错误'
            };
        } else {
            res.article = article;
            let payload = { password: data.password, time: new Date().getTime(), timeout: 1000 * 60 * 60 * 2 };
            let token = jwt.sign(payload, 'screct');
            ctx.body = {
                code: 200,
                tips: '登陆成功',
                token,
                data: res
            };
        }
    }
};

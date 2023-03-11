// MySQL
const mysql = require('mysql');
const { dataBaseConfig } = require('../../config/config.default');
let { init } = require('mysqls');

init({
    user: dataBaseConfig.USER, //用户名
    password: dataBaseConfig.PASSWORD, //密码
    host: dataBaseConfig.HOST, //主机（默认都是local host）
    database: dataBaseConfig.DATABASE, //数据库名
    post: '8080'
});

const connect = mysql.createPool({
    user: dataBaseConfig.USER, //用户名
    password: dataBaseConfig.PASSWORD, //密码
    host: dataBaseConfig.HOST, //主机（默认都是local host）
    database: dataBaseConfig.DATABASE //数据库名
});

/**
 *
 * @param {需要查询的sql语句} sql
 * @param {查询的参数格式: ['key=value','key=value']} query
 * @returns Promise
 */
function selectQuery(sql, params) {
    return new Promise((resolve, reject) => {
        connect.query(sql, params, function (err, results, fields) {
            console.log(results, 'selectQuery');
            if (err === null) {
                resolve(results);
                return;
            }
            console.log(err, 'err');
            reject(err);
        });
    });
}

/**
 *
 * @param {*} table
 * @param {*} params
 * @returns
 */
function insertIntoQuery(table, params) {
    return new Promise((resolve, reject) => {
        connect.query(
            {
                sql: `INSERT INTO ${table} (${params[0]}) VALUES(?)`,
                timeout: 40000,
                values: [params[1]]
            },
            function (err, results, fields) {
                if (err === null) {
                    resolve(results);
                    return;
                }
                console.log(err);
                reject(err);
            }
        );
    });
}

/** 创建表 */
const tables = [
    {
        type: 'category_table',
        handler: () => {
            connect.query(
                `create table if not exists category_table(
                          id int not null primary key auto_increment,
                          label varchar(255) not null,
                          active char(255) not null,
                          create_date BIGINT null,
                          article_num_total int null);`
            );
        }
    },
    {
        type: 'article_table',
        handler: (err, res) => {
            connect.query(
                `create table if not exists article_table(
                        id int not null primary key auto_increment,
                        title varchar(255)  null,
                        active varchar(255)  null,
                        content mediumtext  null,
                        article_image varchar(255)  null,
                        author_name varchar(255) null,
                        create_date BIGINT  null,
                        update_date BIGINT  null,
                        author_id int not null,
                        author varchar(255) null,
                        category varchar(255) null);`
            );
        }
    },
    {
        type: 'navigation_table',
        handler: (err, res) => {
            connect.query(
                `create table if not exists navigation_table(
                      id int not null primary key auto_increment,
                      title_item varchar(255) not null,
                      create_date BIGINT not null);`
            );
        }
    },
    {
        type: 'login_table',
        handler: () => {
            connect.query(
                `create table if not exists login_table(
                        user_id int not null primary key auto_increment,
                        user_name varchar(255) not null,
                        user_head char(255) null,
                        account char(255) not null,
                        password char(255) not null,
                        create_date BIGINT not null,
                        author_id int not null,
                        account_state char(255) not null);`
            );
        }
    }
];
tables.forEach(el => el.handler());

module.exports = {
    selectQuery,
    insertIntoQuery
};

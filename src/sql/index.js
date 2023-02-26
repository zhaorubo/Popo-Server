// MySQL
const mysql = require('mysql');

class MySQL {
    static _instance;
    _connect;
    constructor() {
        this.initSQL();
        this.initTable();
    }
    static instance() {
        if (!this._instance) {
            this._instance = new MySQL();
        }
        return this._instance;
    }
    initSQL() {
        this._connect = mysql.createConnection({
            user: 'root', //用户名
            password: '200083', //密码
            host: 'localhost', //主机（默认都是local host）
            database: 'blog_data' //数据库名
        });
        this._connect.connect(err => {
            if (err === null) {
                new Error('MySQL连接成功');
            } else {
                new Error('MySQL连接失败', err);
            }
        });
    }
    // 查询是否有表，没表就创建
    initTable() {
        const tables = [
            {
                type: 'category_table',
                handler: () => {
                    this.query(
                        `create table if not exists category_table(
                        id int not null primary key auto_increment,
                        label varchar(255) not null,
                        active char(255) not null,
                        create_date date null,
                        article_num_total int null);`
                    );
                }
            },
            {
                type: 'article_table',
                handler: (err, res) => {
                    this.query(
                        `create table if not exists article_table(
                      id int not null primary key auto_increment,
                      title varchar(255)  null,
                      active varchar(255)  null,
                      content mediumtext  null,
                      atricle_image varchar(255)  null,
                      author_name varchar(255) null,
                      create_date date  null,
                      update_date date  null,
                      author_id int not null,
                      author varchar(255) null,
                      category varchar(255) null);`
                    );
                }
            },
            {
                type: 'navigation_table',
                handler: (err, res) => {
                    this.query(
                        `create table if not exists navigation_table(
                    id int not null primary key auto_increment,
                    title_item varchar(255) not null,
                    create_date date not null);`
                    );
                }
            },
            {
                type: 'login_table',
                handler: () => {
                    this.query(
                        `create table if not exists login_table(
                      user_id int not null primary key auto_increment,
                      user_name varchar(255) not null,
                      user_head char(255) null,
                      account char(255) not null,
                      password char(255) not null,
                      create_date date null,
                      article varchar(255) null,
                      author_id int not null,
                      account_state char(255) null);`
                    );
                }
            }
        ];
        tables.forEach(item => {
            item.handler();
        });
    }
    query(query) {
        return new Promise((resolve, reject) => {
            this._connect.query(query, (error, result) => {
                if (isNaN(error)) {
                    reject({ tips: '查询失败', errorCode: error.errno, error, type: 0 });
                    return;
                }
                resolve({
                    tips: 'success',
                    result,
                    type: 1
                });
            });
        });
    }
}

const instance = MySQL.instance();
module.exports = instance;

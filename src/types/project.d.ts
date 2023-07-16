export declare type Config = {
    dataBase: {
        ispool?: boolean;
        waitConnection?: boolean;
        connectionLimit?: number;
        queueLimit?: number;
        host: string;
        user: string;
        password: string;
        database: string;
        port: string;
    };
};

declare interface ResultSetHeader {
    constructor: {
        name: 'ResultSetHeader';
    };
    affectedRows: number;
    fieldCount: number;
    info: string;
    insertId: number;
    serverStatus: number;
    warningStatus: number;
    changedRows?: number;
}

export declare interface Response<T> extends UserResponse<T> {}

export declare interface Resquest<T> {}

export declare type UserResquest = {};

// 用户响应类型
export declare type UserResponse<T> = {
    code: number;
    prompt: string;
    data?: T;
    token?: string;
};
// User
export declare type LoginParams = {
    loginId: string;
    password: string;
};

// ARTICLE
export declare type ArticleResponse<T> = {
    code: number;
    prompt: string;
    data?: T;
};

/** 统计查询方法 */
export declare enum QUERY_METHOD {
    COUNT = 'count', // 统计数量
    MAX = 'max', // 获取最大值
    MIN = 'min', // 获取最小值
    AVG = 'avg', // 获取平均值
    SUM = 'sum' // 获取总数
}

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

export declare interface Response<T> extends UserResponse<T> {}

export declare interface Resquest<T> {}

export declare type UserResquest = {};

// 用户响应类型
export declare type UserResponse<T> = {
    code: number;
    prompt: string;
    data?: T;
};
// User
export declare type LoginParams = {
    loginId: string;
    password: string;
};

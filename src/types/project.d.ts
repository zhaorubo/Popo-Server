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

export declare interface UserResponse extends Response {}

export declare interface UserResquest extends Resquest {
    loginId: string;
    password: string;
}

export declare type Resquest = {};
export declare type Response = {
    code: number;
    prompt: string;
    data?: any;
};

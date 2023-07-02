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

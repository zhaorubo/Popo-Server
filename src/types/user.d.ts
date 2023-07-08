export declare type LoginRequestData = {
    loginId: string;
    password: string;
};
export declare type RegisterRequestData = {
    loginId: string;
    password: string;
    user_name: string;
    headPortrait: string;
};

/** 用户数据 */
export declare type UserData = {
    loginId: string;
    user_name: string;
    user_id: number;
    article_id: string;
};

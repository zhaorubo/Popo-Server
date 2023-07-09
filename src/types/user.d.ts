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

export declare type DeleteUserData = {
    user_id: number;
};

export declare type GetUserData = {
    user_id: number;
};

export declare type QueryUser = Partial<UserData>;

// 查询是否存在
export declare type UserDataKeys = keyof UserData;
/** 用户数据 */
export declare type UserData = {
    loginId: string;
    user_name: string;
    user_id: number;
    article_id: string;
    password: string;
};

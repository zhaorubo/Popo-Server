/** 状态码映射类 */
export class Status {
    private static _message: string;
    /** 成功 */
    public static get SUCCESS(): number {
        this.message = '请求成功';
        return 200;
    }
    /** 服务器出错 */
    public static get SERVER_ERROR(): number {
        this.message = '服务器出错';
        return 500;
    }
    /** 请求超时 */
    public static get TIMEOUT(): number {
        this.message = '请求超时';
        return 408;
    }
    /** 不存在 || 已删除 */
    public static get BE_OUT(): number {
        this.message = '不存在';
        return 410;
    }
    /** 未满足前提条件 */
    public static get NOT_MEET_WITH(): number {
        this.message = '未满足前提条件';
        return 412;
    }
    /** 错误请求(不理解的请求) */
    public static get RESQUEST_ERROR(): number {
        this.message = '错误请求';
        return 400;
    }
    /** 已创建 */
    public static get CREATED(): number {
        this.message = '已创建';
        return 201;
    }
    /** 无内容,服务器作了处理没有返回任何内容 */
    public static get NO_CONTENT(): number {
        this.message = '无内容';
        return 204;
    }

    static get message(): string {
        return this._message;
    }
    static set message(msg: string) {
        this._message = msg;
    }
}

/** 用户接口状态 */
export class UserStatus extends Status {
    public static get ACCOUNT_TO_ERROR(): number {
        this.message = '接收账号不合规';
        return 240001;
    }
    public static get CODE_LIMITED(): number {
        this.message = '60秒不能重复发送';
        return 240002;
    }
    /** 账号已经存在 */
    public static get ACCOUNT_REPEAT(): number {
        this.message = '账号已经存在';
        return 250001;
    }
    public static get ACCOUNT_UNREGISTER(): number {
        this.message = '账号不存在';
        return 250002;
    }
    public static get ACCOUNT_PWD_ERROR(): number {
        this.message = '账号或者密码错误';
        return 250003;
    }
    public static get ACCOUNT_UNLOGIN(): number {
        this.message = '账号未登录';
        return 250004;
    }
    public static get ACCOUNT_DISABLED(): number {
        this.message = '该账号已冻结，请联系管理员';
        return 250007;
    }
    public static get ACCOUNT_STATUS_EXCEPTION(): number {
        this.message = '账号状态异常，请联系管理员';
        return 250008;
    }
}

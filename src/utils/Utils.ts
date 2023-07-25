/**
 * @author star
 * 工具类模块
 */

export default class Utils {
    /** 生成随机x位字符串 */
    public static generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
    /** 生成每个字符前面都插入x位随机字符的加密字符串 */
    public static getRandomString(str: string, length: number): string {
        let randomString: string = '';
        for (let i = 0; i < str.length; i++) {
            randomString += `${this.generateRandomString(length)}${str[i]}`; // 生成随机的五位字符串
        }
        return randomString;
    }
}

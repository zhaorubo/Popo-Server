import { RegisterRequestData } from '../types/user';
import { Status } from '../utils/Status.ts';
import { Response } from '../types/project';

export default abstract class Controller {
    public reponseNotData<T>(keys?: string[]): T {
        return {
            code: Status.NOT_MEET_WITH,
            prompt: `${Status.message},${keys && '缺少:' + keys.join(',')}`,
            data: null
        } as T;
    }

    protected abstract _params: any;
    public abstract set params(val: any);

    /** 检查请求字段 */
    public checkKeys<T>(reqData: T, keys: string[]): string[] | null {
        if (!reqData) return null;
        let notKeys: string[] | null = null;
        keys.forEach((value: string) => {
            if (!reqData[value]) {
                if (!notKeys) notKeys = [];
                notKeys?.push(value);
            }
        });
        return notKeys || null;
    }

    /** 检查是否有传某个字段的集合，没有则直接返回错误给客户端 */
    private checkUserKeys(keys: string[]): Response<Status> | undefined {
        if (!keys.length) return;
        let notKeys: string[] | null = this.checkKeys<RegisterRequestData>(this._params, keys);
        if (notKeys) {
            return this.reponseNotData<Response<Status>>(notKeys!);
        }
    }
}

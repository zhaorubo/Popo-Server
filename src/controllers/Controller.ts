import { Status } from '../utils/Status.ts';

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
}

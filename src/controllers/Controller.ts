import { Status } from '../utils/Status.ts';

export default class Controller {
    public reponseNotData<T>(keys?: string[] | null): T {
        return {
            code: Status.NOT_MEET_WITH,
            prompt: `${Status.message},${keys && '缺少:' + keys.join(',')}`,
            data: null
        } as T;
    }

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

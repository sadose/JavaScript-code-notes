// api 为接口函数（异步），接受请求的 url 作为参数，返回收到的响应
import api from "./utils";

// 全局唯一的单例缓存
const cache: Record<string, string> = {};

// 请求函数
export const request = async (url: string) => {
    if (cache[url]) {
        return cache[url];
    }
    const response = await api(url);
    cache[url] = response;
    return response;
};

import { Middleware, Options, HttpPayload } from './typings';
declare class Request {
    static props: Array<keyof RequestInit>;
    static defaults: Options;
    private readonly middlewares;
    private options;
    constructor(options: Options, middlewares: Middleware[]);
    use(fn: Middleware): void;
    get<T = any>(url: string, options?: Options): Promise<T>;
    post<T = any>(url: string, payload?: HttpPayload, options?: Options): Promise<T>;
    put<T = any>(url: string, payload?: HttpPayload, options?: Options): Promise<T>;
    patch<T = any>(url: string, payload?: HttpPayload, options?: Options): Promise<T>;
    delete<T = any>(url: string, options?: Options): Promise<T>;
    private createContext;
    private createFetch;
    private doRequest;
}
export default Request;

export declare function pick<T extends object>(obj: T, props: Array<keyof T>): Partial<T>;
export declare function isAbsoluteUrl(url: string): boolean;
export declare function methodWithBody(method: string): boolean;
export declare function methodWithoutBody(method: string): boolean;
export declare class TimeoutError extends Error {
}

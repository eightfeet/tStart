/**
 * 将页面像素值转换为rem单位
 * @param {String} px 像素值
 */
export declare function px2rem(px: number): number;
/**
   * 判断是否为微信小程序
   * 建议在WeixinJSBridgeReady回调中使用
   * @export
   * @returns 1：浏览器，2: 微信，3：小程序
   */
export declare function isWeChat(): 1 | 3 | 2;
/**
 *
 * @param {number} times 次数
 * @param {string} tag 标签
 */
export declare const localStorageCounter: (times: number, tag: string) => number | false;
/**
 * @exports
 * @param { String } url url js脚本url地址
 */
export declare const urlLoader: (url: string) => Promise<unknown>;
/**
 * 检测对象类型
 * @param {Any} anyObject 任何检测对象
 * @param {String} type 预判类型
 */
export declare const isType: (anyObject: any, type: 'String' | 'Object' | 'Array' | 'Function' | 'Number' | 'Null' | 'Undefined') => boolean;

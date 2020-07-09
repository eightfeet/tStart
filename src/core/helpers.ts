/**
 * 将页面像素值转换为rem单位
 * @param {String} px 像素值
 */
export function px2rem (px: number) {
	// const baseFont = window.innerWidth/24;
	return px/31.25;
}

/**
   * 判断是否为微信小程序
   * 建议在WeixinJSBridgeReady回调中使用
   * @export
   * @returns 1：浏览器，2: 微信，3：小程序
   */
export function isWeChat() {
	const ua = window.navigator.userAgent.toLowerCase();
	if (ua.indexOf('micromessenger') === -1) {
		return (1);
	} else if ((window as any).__wxjs_environment === 'miniprogram') {
		return (3);
	}
	return (2);
}


/**
 *
 * @param {number} times 次数
 * @param {string} tag 标签
 */
export const localStorageCounter = (times: number, tag: string) => {
	if (!times || !tag) {
		throw 'times计数次数, tag计数标签为必填参数';
	}
	const currentTimes = parseInt(window.localStorage.getItem(tag), 10) || 0;
	if (currentTimes < times) {
		window.localStorage.setItem(tag, (currentTimes + 1).toString());
		return currentTimes;
	}
	window.localStorage.removeItem(tag);
	return false;
};


/**
 * @exports
 * @param { String } url url js脚本url地址
 */
export const  urlLoader = (url: string) => {
	return new Promise(((resolve, reject) => {
		if (!url) {
			reject('缺少url参数');
			return;
		}
		let dom = document.createElement("script");
		dom.setAttribute("src", url);
		dom.onload = dom['onreadystatechange'] = function () {
			if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
				dom.onload = dom['onreadystatechange'] = null;
				setTimeout(() => resolve(), 200);
			}
		};
		dom.onerror = function () {
			reject("文件无法载入");
		};
		document.getElementsByTagName("head")[0].appendChild(dom);
	}));
};

/**
 * 检测对象类型
 * @param {Any} anyObject 任何检测对象
 * @param {String} type 预判类型
 */
export const isType = (
	anyObject: any, 
	type: 'String' | 'Object' | 'Array' | 'Function' | 'Number' | 'Null' | 'Undefined'
):boolean => {
	if (Object.prototype.toString.apply(anyObject) === `[object ${type}]`) {
		return true;
	}
	return false;
};


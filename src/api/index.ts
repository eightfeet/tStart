import { isType } from "~/core/helpers";
const baseUrl=process.env.BY_HEALTH_API_SCRM;
/**
 *
 * @param {Object} parames 参数
 * @param {Object} options fetch报文参数 {headers:{type}} 注意常用的属性type相当于headers['Content-Type'],type只有两个值 json form，默认json
 * @param {String} apiUrl api接口地址
 *
 */
export function accurePoints(parames, options, apiUrl) {
	const { headers, ...otherOptions } = options || {};
	const { type, ...otherHeaders } = headers || {};
	if (!isType(parames, 'Object')) {
		return Promise.reject('参数错误！');
	}
	const operateParames = {
		storeId: '1-WAYZ2', // 默认微信虚拟门店
		channelType: 4, // 默认微信渠道
		...parames
	};

	let paramesString = '';
	if (type==='form') {
		const temp = [];
		Object.keys(operateParames).forEach(key => {
			temp.push(`${key}=${operateParames[key]}`);
		});
		paramesString = temp.join('&');
	} else {
		paramesString = JSON.stringify(operateParames);
	}

	const opreationOptions = {
		method: 'POST',
		headers: {
			'Content-Type': type==='form' ? 'application/x-www-form-urlencoded;charset=utf-8' : 'application/json;charset=utf-8',
			...(otherHeaders || {})
		},
		...(otherOptions || {}),
		credentials: 'include',
		mode: 'cors',
		body: paramesString
	};

	let operateApi = apiUrl ? apiUrl : `${baseUrl}/antifakecode/antifakecodeIntegral`;

	return fetch(operateApi, opreationOptions).then(res => {
		return res.text()
			.then(responseText => new Promise((resolve, reject) => {
				let resp = null;
				try {
					resp = JSON.parse(responseText);
				} catch (error) {
					resp = responseText;
				}
			  return res.status === 200 ? resolve(resp) : reject(resp);
			}
		  ));
	});
}
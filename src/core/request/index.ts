import Request from './request';
import * as middlewares from './middlewares';

const inst = new Request(
  {
    baseUrl: process.env.BY_HEALTH_API_BASE,
    type: 'json',
  },
  [middlewares.timeout, middlewares.http, middlewares.json, middlewares.baseUrl, middlewares.params, middlewares.type],
);

const scrm = new Request(
  {
    baseUrl: process.env.BY_HEALTH_API_SCRM,
    mode: 'cors',
    type: 'json',
  },
  [middlewares.timeout, middlewares.http, middlewares.json, middlewares.baseUrl, middlewares.params, middlewares.type],
);

export default inst;
export { Request };
export { middlewares };
export { scrm };

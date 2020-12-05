import { Context, Middleware } from './typings';
declare function compose(stack: Middleware[]): (context: Context, done: Middleware) => Promise<any>;
export default compose;

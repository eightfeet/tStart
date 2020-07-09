import { MemberInfo } from './member';
import { StoreInfo } from './store';
// 运行时变量

export interface GlobalState {
    member?: MemberInfo;
    isLogin?: boolean;
    store?: StoreInfo;
    A?: string;
    B?: string;
    C?: string;
}

export default interface RuntimeDeclare extends GlobalState {
    setStore: (data: GlobalState) => void;
}

import { MemberInfo, AuthInfo } from '~/types/member';
import { StoreInfo } from '~/types/store';
export interface LoginByJwtTokenResult extends MemberInfo {
    memberAuths: AuthInfo[];
}
/**
 * JwtToken方式登录
 * @param jwtToken
 */
export declare function loginByJwtToken(jwtToken: string): Promise<LoginByJwtTokenResult>;
export declare function getStoreInfoByOrgid(orgid: string): Promise<StoreInfo>;
/**
 * 微信JSSDK授权
 * @param appId
 * @param url
 */
export declare function jssdk(appId: string, url: string): Promise<{
    appId: string;
    timestamp: string;
    nonceStr: string;
    signature: string;
}>;

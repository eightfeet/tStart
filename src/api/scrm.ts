/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import { scrm } from '~/core/request';
import { MemberInfo, AuthInfo, AuthType } from '~/types/member';
import { StoreInfo } from '~/types/store';

export interface LoginByJwtTokenResult extends MemberInfo {
  memberAuths: AuthInfo[];
}

/**
 * JwtToken方式登录
 * @param jwtToken
 */
export function loginByJwtToken(jwtToken: string) {
  return scrm.get<LoginByJwtTokenResult>('/employee/findEmployeeByJwt', {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
}

export function getStoreInfoByOrgid(orgid: string) {
  return scrm.get<StoreInfo>(`/organization/findOrganizationByIdOrNo?orgId=${orgid}`);
}

/**
 * 微信JSSDK授权
 * @param appId
 * @param url
 */
export function jssdk(appId: string, url: string) {
  return scrm.post<{
    appId: string;
    timestamp: string;
    nonceStr: string;
    signature: string;
  }>(
    '/wechatBH/jssdk',
    {
      appId,
      url,
    },
    {
      type: 'form',
    },
  );
}

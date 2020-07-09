/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

export interface MemberInfo {
    /**
     * 员工ID (店员ID)
     */
    memberId: number;
    /**
     * 员工名称
     */
    memberName: string;
    /**
     * 昵称
     */
    nickName: string;
    /**
     * 会员手机号
     */
    mobilePhone: string;
    /**
     * 性别
     */
    gender: MemberGender;
    /**
     * 用户类型
     */
    memberType: MemberType;
    /**
     * 用户头像（URL）
     */
    headimg: string;
    /**
     * 可用汤币
     */
    availableMoney: number;
    /**
     * 冻结汤币
     */
    freezingMoney: number;
    /**
     * 创建时间（ISO 8601）
     */
    createTime: string;
    /**
     * 更新时间（ISO 8601）
     */
    updateTime: string;
    /**
     * 店员状态
     */
    status: MemberStatus;

    /**
     * 机构ID (门店ID)
     */
    orgId: string;

    /**
     * 机构编号 (门店编号)
     */
    orgNo: string;

    /**
     * 店员角色
     */
    roles: MemberRoles[];

    // [key: string]: any;
}

export enum MemberRoles {
    /**
     * 店员
     */
    Clerk = 1,
    /**
     * 店长
     */
    Manager = 2,
}

export enum MemberStatus {
    /**
     * 未激活
     */
    None = 0,
    /**
     * 已激活
     */
    Enabled = 1,
    /**
     * 已停用
     */
    Disabled = 2,
    /**
     * 已注销
     */
    Cancelled = -1,
}

/**
 * 性别
 */
export enum MemberGender {
    Unknown = 0,
    Male = 1,
    Female = 2,
}

/**
 * 会员类型
 */
export enum MemberType {
    /**
     * 粉丝
     */
    Fans = 0,
    /**
     * 会员
     */
    Member = 1,
    /**
     * 机构员工
     */
    AgencyEmployees = 2,
    /**
     * 同时是会员和机构员工
     */
    MemberAndAgencyEmployees = 3,
}

/**
 * 授权方式
 */
export interface AuthInfo {
    authId: number;
    memberId: number;
    identityType: AuthType;
    identityTypeName: string;
    identity: string;
    credential: string;
    isVerified: boolean;
    isEnable: 0 | 1;
}

export enum AuthType {
    PHONE = 'PHONE',
    WECHAT_YYJ = 'WECHAT_YYJ',
    APPLET_YYGJ = 'APPLET_YYGJ',
    APPLET_MARKTCNTER = 'APPLET_MARKTCNTER',
}

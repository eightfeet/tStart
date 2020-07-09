import { loginByJwtToken } from '~/api/scrm';

interface Searchs {
    jwt?: string;
}

export default async ({ jwt }: Searchs) => {
    let member = null
    let isLogin = false
    // 尝试jwt登录
    if (jwt) {
        try {
            member = await loginByJwtToken(jwt);
            isLogin = true;
        } catch (error) {
            // 会员登录
            console.error(error)
        }
    }
    
    return {member, isLogin};
}
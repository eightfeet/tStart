export default function(success: (data : object) => void, error: (error : {[key:string]: any}) => void) {
    // 载入login模块
  (window as any).BY_HEALTH.loadModule("login").then(() => {
    // 创建login
    const getUser = new (window as any).ByhealthLogin({
      // Options
      memberType: 'employee',
      loginType: ['password', 'validatecode'],
      isDev: process.env.BY_HEALTH_ISDEV === 'true'
    });
    console.log('getUser', getUser)
    // 登录
    getUser.login({}, function(err, data){
      if (err) {
        // 登录失败
        error(err)
        return;
      }
      // 登录成功 处理data
      success(data)
    })
  });
}
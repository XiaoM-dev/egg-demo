import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1661931849849_6700';

  // add your egg config in here
  config.middleware = [];
  // config.middleware = [ 'errorHandler' ];

  // add mysql config
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'mr',
      // 密码
      password: 'mr',
      // 数据库名
      database: 'localTest',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  
  // err
  config.onerror={
    all(err: any, ctx: any) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      ctx.body = err;
      ctx.status = 500;
    },
    html(err: any, ctx: any) {
      // html hander
      ctx.body = `<h3>${err}</h3>`;
      ctx.status = 500;
    },
    json(err: any, ctx: any) {
      // json hander
      ctx.body = { message: err };
      ctx.status = 500;
    },
  };

  // 配置body数据长度
  config.bodyParser = {
    jsonLimit: '1mb',
    formLimit: '1mb',
  };

  
  config.security = {
    csrf: {
      enable: false,
    },
  };
  
  config.validate = {   // 配置参数校验器，基于parameter
    convert: true,    // 对参数可以使用convertType规则进行类型转换
    // validateRoot: false,   // 限制被验证值必须是一个对象。
  };
  
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };


  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};

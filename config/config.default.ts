import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1664334566589_2565';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // mongo config
  config.mongoose = {
    client: {
      url: 'mongodb://mr:mr@localhost:27017/localTest',
      options: {
        useNewUrlParser: true,
      },
    },
  };

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
  config.onerror = {
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

  config.validate = { // 配置参数校验器，基于parameter
    convert: true, // 对参数可以使用convertType规则进行类型转换
    // validateRoot: false,   // 限制被验证值必须是一个对象。
  };

  config.elasticsearch = {
    host: 'localhost:9200',
    apiVersion: '7.x',
  };

  // swag config
  config.swaggerEgg = {
    schema: {
      path: '/app/schema', // JSON Schema directory
    },
    swagger: {
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: '127.0.0.1:7001', // should be egg server's host, otherwise result in cross origin error
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'user', description: 'User related end-points' },
        { name: 'character', description: 'Character related end-points' },
        { name: 'mguser', description: 'Mguser related end-points' }
      ],
      securityDefinitions: {
        api_key: {
          type: 'apiKey', // basic/apiKey/oauth2
          name: 'Authorization', // selfdefined parameter, usually use 'Authorization'
          in: 'header', // query or header, usually use 'header'
        },
        github_auth: {
          type: 'oauth2',
          authorizationUrl: 'http://swagger.io/api/oauth/dialog',
          flow: 'implicit',
          scopes: {
            'write:homes': 'modify home info',
            'read:homes': 'read home info',
          },
        },
      },
      security: [
        {
          api_key: [], // select 'api_key' to security(defined in `securityDefinitions`)
        },
      ], // Cacution: security is array type
      typescriptJsonSchema: false, // use typescript json schema. (see: https://github.com/YousefED/typescript-json-schema)
    }
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};

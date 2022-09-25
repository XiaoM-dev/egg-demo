import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },

  // import mysql plugin
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },

  // import mongo plugin
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },

  // import es plugin
  elasticsearch: {
    enable: true,
    package: 'egg-es',
  },

  // import swagger plugin
  swaggerdoc: {
    enable: false, // 是否启用
    package: 'egg-swagger-doc', // 指定包名称
  },

  validate: {
    enable: true,
    package: 'egg-validate',
  },
};


export default plugin;

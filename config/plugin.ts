import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },

  // import swagger plugin
  swaggerEgg: {
    enable: true,
    package: "swagger-egg",
  },

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

  validate: {
    enable: true,
    package: 'egg-validate',
  },
};

export default plugin;

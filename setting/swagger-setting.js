import Generator from 'express-swagger-generator'
const Options = {
  swaggerDefinition: {
      info: {
          description: '项目介绍',
          title: 'Swagger API',
          version: '1.0.0'
      },
      host: 'localhost:3000',//ip和端口
      basePath: '/',
      produces: ['application/json', 'application/xml'],
      schemes: ['http', 'https'],
      securityDefinitions: {
          JWT: {
              type: 'apiKey',
              in: 'header',
              name: 'Authorization',
              description: ''
          }
      }
  },
  route: {
      url: '/swagger',//对应模块的接口，不同服务请指定不同接口
      docs: '/swagger.json'
  },
  basedir: __dirname,
  files: ["../routes/*.js"]//可指定多个目录，只有指定的文件夹下的注释才会生成文档
}

module.exports = function setSwagger(app) {
  const expressSwagger = Generator(app);
  expressSwagger(Options);
}

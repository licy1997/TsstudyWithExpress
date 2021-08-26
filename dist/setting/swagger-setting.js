"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_swagger_generator_1 = __importDefault(require("express-swagger-generator"));
var Options = {
    swaggerDefinition: {
        info: {
            description: '项目介绍',
            title: 'Swagger API',
            version: '1.0.0'
        },
        host: 'localhost:3000',
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
        url: '/swagger',
        docs: '/swagger.json'
    },
    basedir: __dirname,
    files: ["../router/*.js", "../service/*.js",] //可指定多个目录，只有指定的文件夹下的注释才会生成文档
};
module.exports = function setSwagger(app) {
    var expressSwagger = express_swagger_generator_1.default(app);
    expressSwagger(Options);
};

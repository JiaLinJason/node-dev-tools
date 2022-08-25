/// <reference path="./mail.d.ts" />
/// <reference path="./mongo.d.ts" />
/// <reference path="./redis.d.ts" />

declare module "jarvis/services" {
    namespace services {
        interface Services extends MailService, MongoService, RedisService {}
    }

    const services: services.Services;

    export = services;
}

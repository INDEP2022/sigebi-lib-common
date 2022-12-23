import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { getEnvPath } from './common/helper/env.helper';
import { AllExceptionsFilter } from './core/exception.interceptor';
// import { DbconfigModule } from './modules/dbconfig/dbconfig.module';
import {AppService } from './app.service';

const envFilePath: string = getEnvPath(`${__dirname}/common/env/messages`);

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: 'msg.env',
  }),
    /*DbconfigModule*/],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
  controllers: [],
  exports: [AppService],


})
export class AppModule { }

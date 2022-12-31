import { TypeOrmModuleOptions } from '@nestjs/typeorm';


require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions { 
    console.log('Envriroment: ' + process.env.NODE_ENV);
    const nodeEnv = process.env.NODE_ENV || "development";

    console.log('Envriroment: ' + nodeEnv);
/*
    if(nodeEnv !=='production'){
      return {
        type: 'postgres', 

        host: this.getValue('DB_HOST') || 'psql-sigebi-qa.postgres.database.azure.com', 
        port: parseInt(this.getValue('POSTGRES_PORT')) || 5432,
        username: this.getValue('POSTGRES_USER') || 'dbsigebiadmon',
        password: this.getValue('DB_PASS') || 's1g3b1@22',
        database: this.getValue('POSTGRES_DB') || 'psql-sigebi',
        entities: ['dist.entity.js'], 
        synchronize: false, 
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      };
    }else{
      */
      return {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.DB_PASS,
        database: process.env.POSTGRES_DB,
        entities: ['dist/**/*.entity.js'], 
        synchronize: false, 
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      };      
    //}
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'DB_PASS',
  'POSTGRES_DB',
]);

export { configService };

import { Module } from '@nestjs/common';
import { SubscribeModule } from './subscribe/subscribe.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import TypeOrmConfig from './config/typeorm';
import { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    SubscribeModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [TypeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): DataSourceOptions => {
        const config = configService.get<DataSourceOptions>('typeorm')
        if (!config) {
          throw new Error('TypeORM configuration not found');
        }
        return config
      }

    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
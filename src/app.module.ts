import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserTokensModule } from './user-tokens/user-tokens.module';
import { UserToken } from './user-tokens/entities/user-token.entity';
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: +process.env.dbPORT,
      username: process.env.dbUSER,
      password: process.env.PASSWORD,
      database: process.env.dbNAME,
      entities: [User, UserToken],
      synchronize: true,
    }),
    UsersModule, AuthModule, UserTokensModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

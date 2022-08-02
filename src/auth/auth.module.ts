import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserTokensModule } from 'src/user-tokens/user-tokens.module';

@Module({
  imports: [UsersModule, PassportModule, UserTokensModule,
    JwtModule.register({
      secret: 'jwt_secret_dentunity',
      signOptions: { expiresIn: '600000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }

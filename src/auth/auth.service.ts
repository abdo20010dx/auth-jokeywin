import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from 'src/users/dto/create-user.dto';
import { UserTokensService } from 'src/user-tokens/user-tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private userTokens: UserTokensService
  ) { }

  async validateUser(signinDto: SigninDto): Promise<any> {
    let { email, password } = signinDto
    const user = await this.usersService.signin(email, password);
    if (user.email) {
      const { password, ...result } = user;
      let token = "Bearer " + this.jwtService.sign(result)
      this.userTokens.create({ token, userId: user.id })
      return {
        Authorization: token,
        data: result
      };
    }
    return null;
  }

}

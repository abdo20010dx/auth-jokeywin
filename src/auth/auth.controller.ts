import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/public.decorator';
import { CreateUserDto, SigninDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) { }
  @Public()
  @Post('/signin')
  signin(@Body() signinDto: SigninDto, @Req() req: any) {
    // console.log(req.headers);

    return this.authService.validateUser(signinDto);
  }

  @Public()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    // console.log(createUserDto);
    let signinDto = await { email: createUserDto.email, password: createUserDto.password }

    let user = await this.usersService.signup(createUserDto);
    if (user) {
      return this.authService.validateUser(signinDto);
    }
    return null
  }

}

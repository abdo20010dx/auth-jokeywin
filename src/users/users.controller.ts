import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, Request, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, SigninDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }


  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @Req() req: any) {
    delete updateUserDto.password
    return this.usersService.update(+req.user.id, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}

import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { UpdateUserTokenDto } from './dto/update-user-token.dto';
import { Repository } from 'typeorm'
import { UserToken } from './entities/user-token.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserTokensService {

  constructor(@InjectRepository(UserToken) private repo: Repository<UserToken>) { }

  async create(createUserTokenDto: CreateUserTokenDto) {
    try {
      const userToken = this.repo.create(createUserTokenDto);
      await this.repo.save(userToken);
      return userToken;

    } catch (error) {
      console.log(error);
      throw new HttpException("An error occurred: " + error.message, HttpStatus.BAD_REQUEST);

    }
  }

  async findAll() {
    const userTokens = await this.repo.find({ relations: ['user'] });
    return userTokens;
  }

  async findOne(id: number): Promise<UserToken> {
    const userToken = await this.repo.findOne({
      where: {
        id: id,
      },
      relations: ['user']
    });

    if (!userToken) {
      throw new NotFoundException('userToken not found');
    }

    return userToken;
  }

  async update(userId: number, updateUserTokenDto: UpdateUserTokenDto) {
    try {
      const userToken = await this.findOne(userId);
      await this.repo.update(userId, { ...updateUserTokenDto });

      return this.repo.create({ ...userToken, ...updateUserTokenDto });

    } catch (error) {
      console.log(error);
      throw new HttpException("An error occurred: " + error.message, HttpStatus.BAD_REQUEST);

    }
  }

  async remove(id: number) {
    try {
      const userToken = await this.findOne(id);

      if (!userToken) {
        throw new NotFoundException('userToken not found');
      }
      userToken.isDeleted = true;

      await this.repo.save(userToken);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }
}

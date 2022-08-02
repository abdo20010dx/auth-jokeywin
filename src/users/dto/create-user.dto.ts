import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, MinLength, IsEmail, IsOptional, IsBoolean } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    fname: string

    @ApiProperty()
    @IsString()
    lname: string

    @ApiProperty()
    @IsString()
    // @IsOptional()
    address: string = 'default address'

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string


    @ApiProperty()
    @IsString()
    @MinLength(8)
    password: string


    @ApiProperty()
    @IsNumber()
    age: number

    @ApiProperty()
    @IsString()
    phone: string


    @ApiProperty()
    @IsString()
    image: string = 'image.jpg'

    @ApiProperty()
    @IsString()
    gender: string


    JWT: string
}

export class SigninDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    password: string

}
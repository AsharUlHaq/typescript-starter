import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn-user.dto';
import { ENV } from 'src/utils/env.utils';
import { sign } from 'jsonwebtoken';
import { Request, Response } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  async createHandler(@Body() body: CreateUserDto) {
    try {
      if (body.password != body.confirmPassword) {
        throw new BadRequestException('password did not match...');
      }
      const salt = await bcrypt.genSalt();
      body.password = await bcrypt.hash(body.password, salt);
      const userSign = await this.userService.create(body);
      return { userSign, message: 'user created successfully' };
    } catch (error: any) {
      console.log(error);
      throw new Error('user creation failed');
    }
  }

  @Post('/sign-in')
  async signInHandler(@Body() body: SignInDto) {
    try {
      const uEmail = body.email;
      const user = await this.userService.findOneByEmail(uEmail);
      if (!user) throw new BadRequestException('Invalid Credentials...');
      const checkPassword = await bcrypt.compare(body.password, user.password);
      if (!checkPassword)
        throw new BadRequestException('Invalid Credentials...');
      if (user.emailVerification === false)
        throw new BadRequestException('verify your email...');
      if (user.emailVerification === true) {
        if (user.status === false)
          throw new BadRequestException('pending approval...');
      }
      const { password, confirmPassword, ...rest } = user; // Remove password field for security
      const token = sign(rest, ENV.JWT_SECRET, { expiresIn: '1d' });
    } catch (error: any) {
      return error.message;
    }
  }

  //   @Get('/get-users')
  //   async findAllHandler() {
  //     const getUsers = await this.projectService.findAll();
  //     const user = getUsers;
  //     console.log(getUsers);
  //     return { message: 'success' };
  //   }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.projectService.findOne(+id);
  //   }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
  //     return this.projectService.update(+id, updateProjectDto);
  //   }

  @Patch(':id')
  async update(@Body() body: UpdateUserDto) {
    try {
      const currentUser: number = (Req as any).userId;
      const updateUser = await this.userService.update(currentUser, body);
      return { message: `user updated successfully` };
    } catch (error: any) {
      console.log(error);
      throw error.message;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      const deleteUser = this.userService.remove(id);
      return { message: `user successfully deleted at id: ${id}` };
    } catch (error: any) {
      throw new Error('user deletion failed...');
    }
  }
}

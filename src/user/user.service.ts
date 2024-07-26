import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import prisma from 'src/utils/db.utils';

@Injectable()
export class UserService {
  async create(data: CreateUserDto) {
    try {
      return prisma.user.create({ data });
    } catch (error: any) {
      if (error.code === 'P2002') {
        const target = error.meta.target[0];
        throw new Error(`${target} Must be unique`);
      }
      throw error.message;
    }
  }

  async findAll() {
    const getUsers = await prisma.user.findMany();

    return getUsers;
  }

  async findOneById(id: number) {
    const userId = await prisma.user.findUnique({ where: { id } });
    if (!userId) throw new NotFoundException(`id: ${id} does not exist`);
    return userId;
  }

  async findOneByEmail(email: string) {
    const userEmail = await prisma.user.findUnique({ where: { email: email } });
    if (!userEmail) throw new NotFoundException('not found!');
    return userEmail;
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.findOneById(id);
    if (!user) throw new NotFoundException('User not found!');
    const updateUser = await prisma.user.update({
      data: {
        username: data.username,
        number: data.number,
        age: data.age,
        country: data.country,
        city: data.city,
      },
      where: { id },
    });
    return updateUser;
  }

  async remove(id: number) {
    const user = await this.findOneById(id);
    if (!user) throw new NotFoundException('User not found');
    const deleteUser = await prisma.user.delete({ where: { id } });
    return deleteUser;
  }
}

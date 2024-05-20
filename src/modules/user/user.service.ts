import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

import { Excluder } from 'src/shared/helpers/excluder.helpers';
import { AuthHelpers } from 'src/shared/helpers/auth.helpers';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async createUser(
    data: Prisma.UserCreateInput,
  ): Promise<Omit<User, 'password' | 'hashToken'>> {
    const checkUser = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    if (checkUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const encryptedPass = await AuthHelpers.hash(data.password);

    const user = await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: encryptedPass,
        hashToken: '',
      },
    });
    const clientClean = Excluder(user, ['password', 'hashToken']);
    return clientClean;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const getUser = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!getUser) {
      throw new HttpException(
        'Email and Password Do Not Match',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isValidPassword = await AuthHelpers.verify(
      password,
      getUser.password,
    );

    if (!isValidPassword) {
      throw new HttpException(
        'Email and Password Do Not Match',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return getUser;
  }

  async validateUserId(sub: string): Promise<User> {
    const getUser = await this.prisma.user.findFirst({
      where: { id: sub },
    });

    return getUser;
  }

  async updateUser(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    try {
      const updatedUser = await this.prisma.user.update({
        where,
        data,
      });
      return updatedUser;
    } catch (error) {
      throw new Error(`Could not update user: ${error.message}`);
    }
  }

  create(createUserDto: CreateUserDto) {
    return `This action adds a new user ${createUserDto.firstName}`;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user ${updateUserDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

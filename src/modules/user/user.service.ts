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

    const encryptedPass = await AuthHelpers.hash('sadsadasd');

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

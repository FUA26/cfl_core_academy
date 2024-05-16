import { Injectable } from '@nestjs/common';
import { AuthRegisterLoginDto } from './dto/register-auth.dto';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(
    createDto: AuthRegisterLoginDto,
  ): Promise<Omit<User, 'password' | 'hashToken'>> {
    return await this.userService.createUser(createDto);
  }
}

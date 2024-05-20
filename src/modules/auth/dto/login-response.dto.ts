import { User } from '@prisma/client';

export class LoginResponseDto {
  accessToken: string;
  user: User;
}

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterLoginDto } from './dto/register-auth.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RegisterResponseDto } from './dto/register-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ description: 'Login user' })
  @ApiBody({ type: AuthRegisterLoginDto })
  @ApiResponse({ type: RegisterResponseDto })
  async register(
    @Body() registerDto: AuthRegisterLoginDto,
  ): Promise<RegisterResponseDto> {
    return await this.authService.register(registerDto);
  }
}

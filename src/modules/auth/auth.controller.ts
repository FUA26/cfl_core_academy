import {
  Controller,
  Post,
  Body,
  Response,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RegisterResponseDto } from './dto/register-response.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { MAX_AGE } from 'src/shared/constants/auth.constants';
import { JwtRefreshGuard } from 'src/shared/guards/jwt-refresh.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ description: 'Register user' })
  @ApiBody({ type: RegisterAuthDto })
  @ApiResponse({ type: RegisterResponseDto })
  async register(
    @Body() registerDto: RegisterAuthDto,
  ): Promise<RegisterResponseDto> {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ description: 'Register user' })
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({ type: LoginResponseDto })
  async login(
    @Body() loginDto: LoginAuthDto,
    @Response() res,
  ): Promise<LoginResponseDto> {
    const userData = await this.authService.validateLogin(loginDto);
    res.cookie('RefreshToken', userData.refreshToken, {
      httpOnly: true,
      maxAge: Number(MAX_AGE) * 1000,
    });

    return res.send({
      user: userData.data,
      accessToken: userData.accessToken,
    });
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Request() req, @Response() res) {
    const user = req.user;
    const token = await this.authService.validateRefreshToken(
      user.sub,
      req.cookies['RefreshToken'],
    );

    return res.send({ accessToken: token.accessToken });
  }
}

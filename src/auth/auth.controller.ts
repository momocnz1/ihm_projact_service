import { Controller,Get,Request, Post, Body, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: { username: string; password: string }) {
    const user = await this.userService.findOne(credentials.username);

    if (user && await this.authService.validatePassword(credentials.password, user.password)) {
      return { access_token: await this.authService.generateToken(user) };
    } else {
      return { message: 'Invalid credentials' };
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req){
    return req.user;
  }
}
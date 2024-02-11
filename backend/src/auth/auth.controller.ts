import { Controller,Get,Request, Post, Body, HttpStatus, HttpCode, UseGuards, Req } from '@nestjs/common';
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
  async login(@Body() credentials: { usernameOrEmail: string; password: string }) {
    const user = await this.userService.findOne(credentials.usernameOrEmail);

    if (user && await this.authService.validatePassword(credentials.password, user.password)) {
      return { access_token: await this.authService.generateToken(user) };
    } else {
      return { message: 'Invalid credentials' };
    }
  }
  @Post('logout')
  async logout(@Req() req) {
    await this.authService.logout(req.user);
    return { message: 'Logout successfully' };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req){
    return req.user;
  }
}
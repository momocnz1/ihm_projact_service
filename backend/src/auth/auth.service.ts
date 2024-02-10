import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userasService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validatePassword(password: string, userPassword: string): Promise<boolean> {
    return password === userPassword;
  }

  async generateToken(user: { id: number; username: string ; email:string}): Promise<string> {
    const payload = { sub: user.id, username: user.username  ,email: user.email };
    return this.jwtService.signAsync(payload);
  }
}

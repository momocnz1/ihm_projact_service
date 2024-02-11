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

  async logout(user: any) {
    user.token = null;
    // ส่วนอื่น ๆ ที่เกี่ยวข้องกับการ logout
  }

  async generateToken(user: { id: number; username: string ; email:string 
  ;profileImage : string}): Promise<string> {
    const payload = { sub: user.id, username: user.username  ,email: user.email, image: user.profileImage };
    return this.jwtService.signAsync(payload);
  }
}

import { 
  CanActivate, 
  ExecutionContext, 
  Injectable, 
  UnauthorizedException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
//import { jwtConstants } from './constants';
import { Request } from 'express';
import User from 'src/entities/user';
import { Repository } from 'typeorm';


  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private configService : ConfigService,
      @InjectRepository(User)
       private userRepository : Repository<User>
      ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,{
            secret: this.configService.get<string>("SECRET",'SECRET'),
          });
        request['user'] = await this.userRepository.findOne({where:{
          username: payload.username }});
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  } 
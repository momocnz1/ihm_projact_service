import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesGuard implements CanActivate {
 constructor(
    private jwtService : JwtService,
    private reflector : Reflector,
    private configService : ConfigService,
    private readonly userService: UsersService,
 ){}
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles){
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token){
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token,{
                secret: this.configService.get<string>('SECRET'),
            });
            const user = await this.userService.findOne(payload.username);

            if (user) {
                return requiredRoles.some((role) => user.roles?.includes(role));
            }else{
                return false;            
            }
        }catch{
            throw new UnauthorizedException();
        }
    }
    private extractTokenFromHeader(request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ')??[];
        return type === 'Bearer' ? token : undefined;
    }
}
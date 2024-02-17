import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/entities/user';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
//import { jwtConstants } from './constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Admin from 'src/entities/admin';
import AdminsService from 'src/users/admin.service';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory : (configService : ConfigService) => {
        let option : JwtModuleOptions = {
          global: true,
          secret: configService.get<string>("SECRET",'SECRET'),
          signOptions: { expiresIn: '1h' },
        }
        return option
      },
      inject : [ConfigService]
    }),
    TypeOrmModule.forFeature([User,Admin])
  ],
  providers: [AuthService,UsersService,AdminsService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

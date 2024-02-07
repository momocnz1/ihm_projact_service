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

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory : (configService : ConfigService) => {
        let option : JwtModuleOptions = {
          global: true,
          secret: configService.get<string>("SECRET",'default_secret'),
          signOptions: { expiresIn: '60s'}
        }
        return option
      },
      inject : [ConfigService]
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService,UsersService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
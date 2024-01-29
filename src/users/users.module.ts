import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/ihm/entities/user';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.registerAsync({
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
  }),TypeOrmModule.forFeature([User])],
  providers: [UsersService,AuthService],
  exports: [UsersService],
})
export class UsersModule {}

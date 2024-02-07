import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import PostNotification from './entities/postNotification';
import User from './entities/user';
import Admin from './entities/admin';
import Post from './entities/post';
import { UserController } from './controller/user';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import UserService from './service/user';
import PostController from './controller/post';
import AdminController from './controller/admin';
import PostNotificationController from './controller/postNotification';
import PostNotificationService from './service/postNotification';
import PostService from './service/post';
import AdminService from './service/admin';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports :[ConfigModule],
      useFactory:(configService : ConfigService) =>{
        let option : TypeOrmModule = {
          type : "sqlite" ,
          database : configService.get<string>("DATABASE_NAME", 'ihm.db'),
          entities: [User,Admin,PostNotification,Post],
          synchronize: true
        }
        return option;
      },
     inject : [ConfigService]
    }),
    TypeOrmModule.forFeature([User,Admin,PostNotification,Post]),
    JwtModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [UserController,AppController,PostNotificationController,PostController,AdminController],
  providers: [AppService,UserService,PostNotificationService,PostService,AdminService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule {}
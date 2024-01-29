import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import PostNotification from './ihm/entities/postNotification';
import User from './ihm/entities/user';
import Admin from './ihm/entities/admin';
import Post from './ihm/entities/post';
import { UserController } from './ihm/controller/user';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import UserService from './ihm/service/user';
import PostController from './ihm/controller/post';
import AdminController from './ihm/controller/admin';
import PostNotificationController from './ihm/controller/postNotification';
import PostNotificationService from './ihm/service/postNotification';
import PostService from './ihm/service/post';
import AdminService from './ihm/service/admin';
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
    UsersModule
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
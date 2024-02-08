import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(identifier: string): Promise<User | undefined> {
    return this.userRepository.findOne({where :[{ username: identifier }, { email: identifier }]});
  }
  async getUserRoles(username: string): Promise<string[] | undefined> {
    const user = await this.findOne(username);
    return user?.roles;
  }
}

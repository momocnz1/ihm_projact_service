import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Admin from 'src/entities/admin';

@Injectable()
export default class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async findOne(usernameOrEmail: string): Promise<Admin | undefined> {
    return this.adminRepository.findOne({ where: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
  }
}
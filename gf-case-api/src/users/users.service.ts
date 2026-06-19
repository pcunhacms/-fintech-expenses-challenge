import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto) {
    return this.usersRepository.save(userData);
  }

  async findByEmail(email: string) {
  return this.usersRepository.findOne({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
    },
  });
}



  async findById(id: string) {
  return this.usersRepository.findOne({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}
}
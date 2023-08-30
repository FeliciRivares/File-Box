import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async findUserByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  async findUserByFullname(fullName: string) {
    return this.repository.findOne({ where: { fullName } });
  }

  async findUserById(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  create(dto: CreateUserDto){
    return this.repository.save(dto)
  } 
}

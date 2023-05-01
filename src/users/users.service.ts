import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const options: FindOneOptions<User> = {
      where: { username },
    };
    const findUser = await this.userRepository.find(options);
    if (findUser.length >= 1) {
      return new HttpException('Usuario ya existe', 400);
    }
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) return new HttpException('User not found', 404);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const options: FindOneOptions<User> = {
      where: { id },
    };
    const findUser = await this.userRepository.find(options);
    if (findUser.length === 0)
      throw new HttpException('usuario no encontrado', 404);
    return this.userRepository.update({ id }, updateUserDto);
  }

  async remove(id: number) {
    const options: FindOneOptions<User> = {
      where: { id },
    };
    const findUser = await this.userRepository.find(options);
    if (findUser.length === 0)
      throw new HttpException('usuario no encontrado', 404);
    return this.userRepository.delete({ id });
  }
}

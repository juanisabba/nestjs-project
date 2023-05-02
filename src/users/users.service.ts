import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';
import { ROLES_ENUM } from 'src/constants/roles.enum';
import { IUser } from './models/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    try {
      const hashPassword = await this.authService.hashPassword(password);
      createUserDto.password = hashPassword;
      const user = this.userRepository.create(createUserDto);
      if (!user) {
        throw new HttpException('error', 404);
      }
      return this.userRepository.save(createUserDto);
    } catch (error) {
      throw new HttpException('error', 404);
    }
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

  async findByEmail(email: string): Promise<User> | null {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) return null;
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

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user: User = await this.findByEmail(email);
    if (!user) throw new HttpException('not found', 404);
    const comparePasswords = await this.authService.comparePasswords(
      user.password,
      password,
    );
    if (!comparePasswords)
      throw new HttpException('contraseña incorrecta', 400);
    const token = await this.authService.generateJwt(user);
    return { token };
  }

  async updateRole(id: number, user: IUser) {
    const options: FindOneOptions<User> = {
      where: { id },
    };
    const findUser = await this.userRepository.find(options);
    if (findUser.length === 0)
      throw new HttpException('usuario no encontrado', 404);
    return this.userRepository.update(id, user);
  }
}

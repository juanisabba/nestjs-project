import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJwt(user: User) {
    const { email, id, name, username, role } = user;
    return this.jwtService.signAsync({ id, name, username, email, role });
  }

  hashPassword(password: string) {
    return hash(password, 10);
  }

  comparePasswords(password: string, hashedPassword: string) {
    return compare(hashedPassword, password);
  }
}

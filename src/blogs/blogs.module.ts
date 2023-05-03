import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { BlogEntry } from './entities/blog-entry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntry]), AuthModule, UsersModule],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}

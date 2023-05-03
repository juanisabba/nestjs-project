import { HttpException, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntry } from './entities/blog-entry.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogEntry) private readonly blogsRepository: Repository<BlogEntry>,
    private readonly usersService: UsersService
  ){}
  async create(user, createBlogDto: CreateBlogDto) {
    try {      
      const findUser = await this.usersService.findOne(user.id)
      const createPost = await this.blogsRepository.create({...createBlogDto, author: findUser})
      return this.blogsRepository.save(createPost)
    } catch (error) {
      throw new HttpException(error, 500)
    }

return
  }

  findAll() {
    return this.blogsRepository.find({
      relations: ['author']
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}

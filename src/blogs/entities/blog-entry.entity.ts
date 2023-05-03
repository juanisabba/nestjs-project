import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate, ManyToOne } from 'typeorm';

@Entity('blog_entries')
export class BlogEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({default: ''})
  description: string;

  @Column({default: ''})
  body: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamps(){
    this.updatedAt = new Date
  }

  @Column({default: 0})
  likes: number

  @Column({nullable: true})
  headerImage: string

  @Column({default: true})
  isPublished: boolean

  @ManyToOne(()=> User, user => user.blogs )
  author: User
}

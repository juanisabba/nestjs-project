import { ROLES_ENUM } from 'src/constants/roles.enum';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({type: 'enum', enum: ROLES_ENUM})
  role: ROLES_ENUM;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @BeforeInsert()
  emailToLowerCase(){
    this.email = this.email.toLocaleLowerCase()
  }
}

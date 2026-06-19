import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany
} from 'typeorm';

import { Category } from 'src/categories/entities/category.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column({select: false})
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Category, (category) => category.user)
    categories!: Category[];
}
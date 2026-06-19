import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   ManyToOne,
   CreateDateColumn
} from "typeorm";

import { User } from "src/users/entities/user.entity";
import { Category } from "src/categories/entities/category.entity";

export enum TransactionType {
   INCOME = 'INCOME',
   EXPENSE = 'EXPENSE'
}

@Entity('transactions')
export class Transaction {
   @PrimaryGeneratedColumn('uuid')
   id!: string;

   @Column()
   description!: string;


   @Column('decimal', {
      transformer: {
         to: (value: number) => value,
         from: (value: string) => parseFloat(value),
      },
   })
   value!: number;

   @Column({
      type: 'enum',
      enum: TransactionType,
   })
   type!: TransactionType;

   @Column()
   date!: Date;

   @ManyToOne(() => Category)
   category!: Category;

   @ManyToOne(() => User)
   user!: User;

   @CreateDateColumn()
   createdAt!: Date;
}
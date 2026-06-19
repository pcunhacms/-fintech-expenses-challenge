import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionQueryDto } from './dto/transaction-query.dto';

import { Category } from '../categories/entities/category.entity';

@Injectable()

export class TransactionsService {

  constructor(
    @InjectRepository(Transaction)
    private repo: Repository<Transaction>,

  ) { }

  create(dto: CreateTransactionDto, userId: string) {
    return this.repo.save({
      description: dto.description,
      value: dto.value,
      type: dto.type,
      date: new Date(dto.date),
      category: { id: dto.categoryId },
      user: { id: userId },

    });

  }

  async findAll(userId: string, query: TransactionQueryDto) {

    const {
      page = 1,
      limit = 10,
      type,
      categoryId,
      startDate,
      endDate,
    } = query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const qb = this.repo
      .createQueryBuilder('t')
      .leftJoinAndSelect('t.user', 'user')
      .leftJoinAndSelect('t.category', 'category')
      .where('user.id = :userId', { userId });
    if (type) {
      qb.andWhere('t.type = :type', { type });
    }

    if (categoryId) {
      qb.andWhere('category.id = :categoryId', { categoryId });

    }

    if (startDate && endDate) {
      qb.andWhere('t.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });

    }

    qb.skip((pageNumber - 1) * limitNumber);
    qb.take(limitNumber);

    const [data, total] = await qb.getManyAndCount();
    return {
      data,
      total,
      page: pageNumber,
      lastPage: Math.ceil(total / limitNumber),

    };

  }

  async findOne(id: string, userId: string) {

    const tx = await this.repo
      .createQueryBuilder('t')
      .leftJoinAndSelect('t.user', 'user')
      .leftJoinAndSelect('t.category', 'category')
      .where('t.id = :id', { id })
      .andWhere('user.id = :userId', { userId })
      .getOne();

    if (!tx) {
      throw new NotFoundException('Transaction not found');
    }
    return tx;

  }

  async update(id: string, dto: UpdateTransactionDto, userId: string) {
    const transaction = await this.findOne(id, userId);
    Object.assign(transaction, dto);



    if (dto.categoryId) {
      transaction.category = this.repo.manager.getRepository(Category).create({
        id: dto.categoryId,
      });
    }
    return this.repo.save(transaction);

  }

  async remove(id: string, userId: string) {
    const tx = await this.findOne(id, userId);
    return this.repo.remove(tx);

  }

}



import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';


@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private repo: Repository<Category>,
  ) { }

  create(dto: CreateCategoryDto, userId: string) {
    return this.repo.save({
      ...dto,
      user: { id: userId },
    });
  }

  findAll(userId: string) {
    return this.repo.find({
      where: { user: { id: userId } },
    });
  }

  async findOne(id: string, userId: string) {
    const category = await this.repo.findOne({
      where: {
        id,
        user: { id: userId },
      },
      relations: {
        user: true,
      },
    });



    if (!category) {
      throw new ForbiddenException('Access denied');
    }

    return category;
  }

  async update(id: string, dto: UpdateCategoryDto, userId: string) {
    const category = await this.findOne(id, userId);

    Object.assign(category, dto);

    return this.repo.save(category);
  }

  async remove(id: string, userId: string) {
    const category = await this.findOne(id, userId);

    return this.repo.remove(category);
  }
}
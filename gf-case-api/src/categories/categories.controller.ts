import { Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    Req,
    UseGuards
 } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @Post()
  create(@Body() dto: CreateCategoryDto, @Req() req: { user: { userId: string } }) {
    return this.service.create(dto, req.user.userId);
  }

  @Get()
  findAll(@Req() req: { user: { userId: string } }) {
    return this.service.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: { user: { userId: string } }) {
    return this.service.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto, @Req() req: { user: { userId: string } }) {
    return this.service.update(id, dto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: { user: { userId: string } }) {
    return this.service.remove(id, req.user.userId);
  }
}

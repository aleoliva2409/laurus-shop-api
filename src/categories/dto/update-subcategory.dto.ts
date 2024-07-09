import { PartialType } from '@nestjs/mapped-types';

import { CreateCategoryDto } from './create-category.dto';

export class UpdateSubcategoryDto extends PartialType(CreateCategoryDto) {}

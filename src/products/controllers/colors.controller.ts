import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Colors')
@Controller('colors')
export class ColorsController {}

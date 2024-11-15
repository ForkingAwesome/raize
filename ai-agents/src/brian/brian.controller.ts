import { Controller, Get } from '@nestjs/common';
import { BrianService } from './brian.service';

@Controller('brian')
export class BrianController {
  constructor(private readonly brianService: BrianService) {}

  @Get()
  test() {
    return this.brianService.test();
  }
}

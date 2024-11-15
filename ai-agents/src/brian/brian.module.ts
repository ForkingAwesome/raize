import { Module } from '@nestjs/common';
import { BrianService } from './brian.service';
import { BrianController } from './brian.controller';

@Module({
  controllers: [BrianController],
  providers: [BrianService],
})
export class BrianModule {}

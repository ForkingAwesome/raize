import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrianModule } from './brian/brian.module';

@Module({
  imports: [BrianModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

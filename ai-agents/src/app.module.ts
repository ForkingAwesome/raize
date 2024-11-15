import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AiAgentModule } from './ai-agent/ai-agent.module';

@Module({
  imports: [ConfigModule.forRoot(), AiAgentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

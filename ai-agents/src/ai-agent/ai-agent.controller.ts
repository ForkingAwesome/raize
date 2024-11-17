import { Controller, Get } from '@nestjs/common';
import { AiAgentService } from './ai-agent.service';

@Controller('ai-agent')
export class AiAgentController {
  constructor(private readonly aiAgentService: AiAgentService) {}

  @Get('/response')
  getRedpillcResponse() {
    return this.aiAgentService.getRedpillResponse();
  }

  @Get('/gen')
  getHyperbolicResponse() {
    return this.aiAgentService.getHyperbolicResponse();
  }
}

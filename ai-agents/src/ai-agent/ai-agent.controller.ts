import { Controller, Get } from '@nestjs/common';
import { AiAgentService } from './ai-agent.service';

@Controller('ai-agent')
export class AiAgentController {
  constructor(private readonly aiAgentService: AiAgentService) {}

  @Get('/redpill')
  getRedpillcResponse() {
    return this.aiAgentService.getRedpillResponse();
  }

  @Get('/hyperbolic')
  getHyperbolicResponse() {
    return this.aiAgentService.getHyperbolicResponse();
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { AiAgentService } from './ai-agent.service';

@Controller('ai-agent')
export class AiAgentController {
  constructor(private readonly aiAgentService: AiAgentService) {}

  @Get('/response')
  getRedpillcResponse() {
    return this.aiAgentService.getRedpillResponse();
  }

  @Post('/gen')
  getHyperbolicResponse(@Body() body: { text: string }) {
    return this.aiAgentService.getHyperbolicResponse(body?.text ?? '');
  }
}

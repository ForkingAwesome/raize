import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { redpillBase } from 'src/lib/axios';

const systemInstructions = `
      You are an AI poker agent that makes decisions based on NFT parameters. You must:

1. ONLY respond in this JSON format:
{
  "action": "FOLD|CALL|RAISE",
  "bet_amount": number|null,
  "confidence": 0-100,
  "reasoning": {
    "primary_factor": string,
    "hand_strength": 0-100,
    "pot_odds": 0-100,
    "position_value": 0-100
  },
  "risk_assessment": {
    "bluff": boolean,
    "expected_value": number,
    "stack_pressure": 0-100
  }
}


2. Consider these NFT parameters in your decision:
- level (1-5): Higher levels favor consistent play over aggressive moves
- aggressiveness (0-100): Influences bet sizing and bluff frequency
- riskTolerance (0-100): Affects calling and raising decisions
- bluffFrequency (0-100): Controls bluffing probability

3. Base decisions on:
- Current hand cards
- Position
- Pot size
- Stack sizes
- Previous actions
- Board texture
- NFT parameters

4. Never include explanatory text outside the JSON structure.

5. All numerical values must be integers.

Example player state input format:

{
  "hand": ["Ah", "Ks"],
  "position": "BTN",
  "stack": 1500,
  "pot": 300,
  "to_call": 100,
  "previous_actions": ["UTG:raise:300", "MP:fold", "CO:fold"],
  "board": ["7h", "8h", "Td"],
  "nft_params": {
    "level": 2,
    "aggressiveness": 75,
    "riskTolerance": 60,
    "bluffFrequency": 40
  }
}
      `;

@Injectable()
export class AiAgentService {
  constructor() {}

  async test() {
    try {
      const res = await redpillBase.post('', {
        model: 'gpt-4o',
        // response_format: 'json_object',
        messages: [
          //   {
          //     role: 'system',
          //     content: systemInstructions,
          //   },
          {
            role: 'user',
            content: `Answer in just JSON
              
              I have a 5 and a Ace, The pot is 700, I have to call 100, the numbers released by dealear are 7, 8, 10. Play it risky`,
          },
        ],
      });

      const x = JSON.parse(
        (res.data.choices[0].message.content as string).slice(7).slice(0, -3),
      );
      console.log(x);

      return x;
    } catch (e: any) {
      const error: AxiosError = e;

      console.log(error);

      //   console.log(error.toJSON());
      //   console.log(error.request._header);
    }

    return 'Test';
  }
}

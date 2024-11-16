import 'dotenv/config';
import axios from 'axios';

export const redpillBase = axios.create({
  baseURL: 'https://api.red-pill.ai/v1/chat/completions',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.RED_PILL_API_KEY}`,
  },
});

import { Injectable } from '@nestjs/common';
import { Feed } from './feed.entity';

@Injectable()
export class FeedUseCases {
  findAll(): Feed[] {
    return [];
  }
}

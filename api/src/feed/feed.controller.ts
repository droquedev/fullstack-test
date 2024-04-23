import { Controller, Get } from '@nestjs/common';
import { FeedUseCases } from './feed.use-cases';
import { Feed } from './feed.entity';

@Controller('api/feed')
export class FeedController {
  constructor(private feedUseCases: FeedUseCases) {}

  @Get()
  async findAll(): Promise<Feed[]> {
    return this.feedUseCases.getFeeds();
  }
}

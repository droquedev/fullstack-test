import { Controller, Get, Query } from '@nestjs/common';
import { FeedUseCases } from './feed.use-cases';
import { Feed } from './feed.entity';
import { FeedQueryDto } from './feed.dto';

@Controller('api/feed')
export class FeedController {
  constructor(private feedUseCases: FeedUseCases) {}

  @Get()
  async findAll(@Query() query: FeedQueryDto): Promise<Feed[]> {
    const month = query.month < 10 ? `0${query.month}` : query.month;
    const day = query.day < 10 ? `0${query.day}` : query.day;
    const year = query.year;

    const date = `${year}/${month}/${day}`;

    return this.feedUseCases.getFeeds(date);
  }

  @Get('test')
  async test(@Query() query: FeedQueryDto): Promise<string> {
    console.log(await this.findAll(query));
    return 'Hello, World!';
  }
}

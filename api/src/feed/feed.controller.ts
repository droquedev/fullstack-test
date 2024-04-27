import { Controller, Get, Param, Query } from '@nestjs/common';
import { FeedService } from './feed.service';
import { Feed } from './feed.entity';
import { FeedQueryDto } from './feed.dto';

@Controller('api/feed')
export class FeedController {
  constructor(private feedUseCases: FeedService) {}

  @Get()
  async findAll(@Query() query: FeedQueryDto): Promise<Feed[]> {
    const month = query.month < 10 ? `0${query.month}` : query.month;
    const day = query.day < 10 ? `0${query.day}` : query.day;
    const year = query.year;

    const date = `${year}/${month}/${day}`;

    return this.feedUseCases.getFeeds(date);
  }

  @Get(':lang')
  async findAllAndTranslate(
    @Query() query: FeedQueryDto,
    @Param('lang') lang: string,
  ): Promise<Feed[]> {
    const feeds = await this.findAll(query);
    const translatedFeeds = await this.feedUseCases.getFeedsAndTranslate(
      feeds,
      lang,
    );

    return translatedFeeds;
  }
}

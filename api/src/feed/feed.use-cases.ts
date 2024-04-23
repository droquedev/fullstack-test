import { Injectable } from '@nestjs/common';
import { Feed } from './feed.entity';
import { WikipediaService } from 'src/wikipedia/wikipedia.service';

@Injectable()
export class FeedUseCases {
  constructor(private readonly wikipediaService: WikipediaService) {}
  async getFeeds(): Promise<Feed[]> {
    await this.wikipediaService.fetch();
    return [];
  }
}

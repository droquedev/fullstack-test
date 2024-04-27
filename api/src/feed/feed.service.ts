import { Injectable } from '@nestjs/common';
import { Feed } from './feed.entity';
import { WikipediaService } from '../wikipedia/wikipedia.service';

@Injectable()
export class FeedService {
  constructor(private readonly wikipediaService: WikipediaService) {}
  async getFeeds(date: string): Promise<Feed[]> {
    const feeds = await this.wikipediaService.fetch(date);
    return feeds;
  }
}

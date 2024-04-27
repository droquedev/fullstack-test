import { Injectable } from '@nestjs/common';
import { Feed } from './feed.entity';
import { WikipediaService } from '../external/wikipedia.service';
import { OpenAiService } from 'src/external/openai.service';

@Injectable()
export class FeedService {
  constructor(
    private readonly wikipediaService: WikipediaService,
    private readonly openAiService: OpenAiService,
  ) {}
  async getFeeds(date: string): Promise<Feed[]> {
    const feeds = await this.wikipediaService.fetch(date);
    return feeds;
  }

  async getFeedsAndTranslate(feeds: Feed[], lang: string): Promise<Feed[]> {
    const translatedFeeds = await this.openAiService.translate(feeds, lang);
    return translatedFeeds;
  }
}

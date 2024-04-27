import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Feed } from 'src/feed/feed.entity';

@Injectable()
export class WikipediaService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async fetch(date: string): Promise<Feed[]> {
    const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${date}`;
    const response = await this.httpService.axiosRef.get(url);

    const feedsFromCache = await this.cacheManager.get<Feed[]>(date);

    if (feedsFromCache) {
      this.cacheManager.set(date, feedsFromCache, 15 * 60 * 1000);
      return feedsFromCache;
    }

    const feeds: Feed[] = [];

    if (!response.data.onthisday) return feeds;

    for (const feed of response.data.onthisday) {
      for (const page of feed.pages) {
        const feed = new Feed(
          page.pageid,
          page.titles.normalized,
          page.description,
          page.extract,
          page?.thumbnail || null,
          page.timestamp,
          page.content_urls.desktop.page,
        );
        feeds.push(feed);
      }
    }

    this.cacheManager.set(date, feeds, 15 * 60 * 1000);
    return feeds;
  }
}

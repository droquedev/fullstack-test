import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Feed } from '../feed/feed.entity';

@Injectable()
export class WikipediaService {
  constructor(private readonly httpService: HttpService) {}

  async fetch(date: string): Promise<Feed[]> {
    const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${date}`;
    const response = await this.httpService.axiosRef.get(url);

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

    return feeds;
  }
}

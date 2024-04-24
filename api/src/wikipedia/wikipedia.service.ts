import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Feed } from 'src/feed/feed.entity';

@Injectable()
export class WikipediaService {
  constructor(private readonly httpService: HttpService) {}

  async fetch(date: string): Promise<Feed[]> {
    const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${date}`;
    console.log(url);
    const response = await this.httpService.axiosRef.get(url);

    const feeds: Feed[] = [];

    for (const feed of response.data.onthisday) {
      for (const page of feed.pages) {
        const feed = new Feed(
          page.pageid,
          page.titles.normalized,
          page.extract,
          page?.thumbnail || null,
        );
        feeds.push(feed);
      }
    }

    return feeds;
  }
}

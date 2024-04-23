import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
// import { Feed } from 'src/feed/feed.entity';

@Injectable()
export class WikipediaService {
  constructor(private readonly httpService: HttpService) {}

  async fetch(): Promise<string> {
    const data = await this.httpService.axiosRef.get(
      'https://api.wikimedia.org/feed/v1/wikipedia/en/featured/2024/04/23',
    );

    console.log(data);
    return 'hola';
  }
}

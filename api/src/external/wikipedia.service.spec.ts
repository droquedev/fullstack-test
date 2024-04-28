import { HttpService } from '@nestjs/axios';
import { WikipediaService } from './wikipedia.service';

jest.mock('@nestjs/axios', () => ({
  HttpService: jest.fn().mockImplementation(() => ({
    axiosRef: {
      get: jest.fn().mockResolvedValue({
        data: {
          onthisday: [
            {
              pages: [
                {
                  pageid: 1,
                  titles: { normalized: 'test' },
                  description: 'test',
                  extract: 'test',
                  thumbnail: { source: 'test', width: 100, height: 100 },
                  timestamp: '2021-01-01',
                  content_urls: { desktop: { page: 'test' } },
                },
              ],
            },
          ],
        },
      }),
    },
  })),
}));

describe('WikipediaService', () => {
  let wikipediaService: WikipediaService;
  let httpService: HttpService;

  beforeAll(() => {
    jest.clearAllMocks();
    httpService = new HttpService();
    wikipediaService = new WikipediaService(httpService);
  });

  it('should return an array of feeds', async () => {
    const feeds = await wikipediaService.fetch('2021-01-01');
    expect(feeds).toEqual([
      {
        id: 1,
        title: 'test',
        description: 'test',
        extract: 'test',
        thumbnail: { source: 'test', width: 100, height: 100 },
        date: '2021-01-01',
        url: 'test',
      },
    ]);
  });
});

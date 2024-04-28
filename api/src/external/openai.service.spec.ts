import { Feed } from '../feed/feed.entity';
import { OpenAiService } from './openai.service';

jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => {
    return {
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [
              {
                message: {
                  content: 'Mocked response|Mocker response description',
                },
              },
            ],
          }),
        },
      },
    };
  });
});

describe('OpenAiService', () => {
  let openAiService: OpenAiService;
  beforeAll(() => {
    openAiService = new OpenAiService();
  });
  it('should return an array of translated feeds', async () => {
    const feed = {
      title: 'test',
      date: '2021-01-01',
      description: 'test',
      extract: 'test',
      id: '1',
      thumbnail: {
        source: 'test',
        width: 100,
        height: 100,
      },
      url: 'test',
    };

    const feeds: Feed[] = [
      new Feed(
        feed.id,
        feed.title,
        feed.description,
        feed.extract,
        feed.thumbnail,
        feed.date,
        feed.url,
      ),
    ];

    const translatedFeed = await openAiService.translate(feeds, 'es');
    expect(translatedFeed).toEqual([
      new Feed(
        feed.id,
        'Mocked response',
        'Mocker response description',
        feed.extract,
        feed.thumbnail,
        feed.date,
        feed.url,
      ),
    ]);
  });
});

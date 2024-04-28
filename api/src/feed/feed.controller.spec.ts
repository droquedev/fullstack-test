import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { OpenAiService, OpenAiServiceMock } from '../external/openai.service';
import { WikipediaService } from '../external/wikipedia.service';
import { FeedController } from './feed.controller';
import { FeedQueryDto } from './feed.dto';
import { Feed } from './feed.entity';
import { FeedService } from './feed.service';

describe('FeedController', () => {
  let feedController: FeedController;
  let wikipediaService: WikipediaService;
  let openAiService: OpenAiService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [FeedController],
      providers: [
        FeedService,
        WikipediaService,
        { provide: OpenAiService, useClass: OpenAiServiceMock },
      ],
    }).compile();

    feedController = moduleRef.get<FeedController>(FeedController);
    wikipediaService = moduleRef.get<WikipediaService>(WikipediaService);
    openAiService = moduleRef.get<OpenAiService>(OpenAiService);
  });

  describe('findAll', () => {
    it('should return an array of feeds', async () => {
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

      jest
        .spyOn(wikipediaService, 'fetch')
        .mockImplementation(async () => feeds);

      const response = await feedController.findAll(new FeedQueryDto());
      expect(response).toBe(feeds);
    });
  });

  describe('translate', () => {
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

      jest
        .spyOn(feedController, 'findAll')
        .mockImplementation(async () => feeds);

      jest
        .spyOn(openAiService, 'translate')
        .mockImplementation(async () => feeds);

      const response = await feedController.findAllAndTranslate(
        new FeedQueryDto(),
        'fr',
      );

      expect(openAiService.translate).toHaveBeenCalledWith(feeds, 'fr');

      expect(response).toBe(feeds);
    });
  });
});

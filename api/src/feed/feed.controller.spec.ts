import { Test } from '@nestjs/testing';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { FeedQueryDto } from './feed.dto';
import { Feed } from './feed.entity';
import { WikipediaService } from '../external/wikipedia.service';
import { HttpModule } from '@nestjs/axios';

describe('CatsController', () => {
  let feedController: FeedController;
  let wikipediaService: WikipediaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [FeedController],
      providers: [FeedService, WikipediaService],
    }).compile();

    wikipediaService = moduleRef.get<WikipediaService>(WikipediaService);
    feedController = moduleRef.get<FeedController>(FeedController);
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
});

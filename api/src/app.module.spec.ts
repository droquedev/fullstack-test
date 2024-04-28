import { CacheModule } from '@nestjs/cache-manager';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import supertest from 'supertest';
import { FeedModule } from './feed/feed.module';
import { RequestLog } from './log/log.entity';

describe('ApiController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        CacheModule.register(),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [RequestLog],
          synchronize: true,
        }),
        FeedModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  describe('/api/feed (GET)', () => {
    it('should return a 400 if the required query params are not provided', async () => {
      const request = await supertest(app.getHttpServer())
        .get('/api/feed')
        .send();
      expect(request.status).toBe(400);
      expect(request.body.message).toEqual([
        'year must be a number conforming to the specified constraints',
        'month must be a number conforming to the specified constraints',
        'day must be a number conforming to the specified constraints',
      ]);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

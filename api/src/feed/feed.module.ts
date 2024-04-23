import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedUseCases } from './feed.use-cases';
import { HttpModule } from '@nestjs/axios';
import { WikipediaService } from 'src/wikipedia/wikipedia.service';

@Module({
  imports: [HttpModule],
  controllers: [FeedController],
  providers: [FeedUseCases, WikipediaService],
})
export class FeedModule {}

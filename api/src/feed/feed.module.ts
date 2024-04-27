import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { HttpModule } from '@nestjs/axios';
import { WikipediaService } from 'src/wikipedia/wikipedia.service';

@Module({
  imports: [HttpModule],
  controllers: [FeedController],
  providers: [FeedService, WikipediaService],
})
export class FeedModule {}

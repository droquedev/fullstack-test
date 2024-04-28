import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OpenAiService } from '../external/openai.service';
import { WikipediaService } from '../external/wikipedia.service';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

@Module({
  imports: [HttpModule],
  controllers: [FeedController],
  providers: [FeedService, WikipediaService, OpenAiService],
})
export class FeedModule {}

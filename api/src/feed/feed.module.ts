import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OpenAiService } from 'src/external/openai.service';
import { WikipediaService } from 'src/external/wikipedia.service';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

@Module({
  imports: [HttpModule],
  controllers: [FeedController],
  providers: [FeedService, WikipediaService, OpenAiService],
})
export class FeedModule {}

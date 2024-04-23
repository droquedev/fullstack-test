import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedUseCases } from './feed.use-cases';

@Module({
  imports: [],
  controllers: [FeedController],
  providers: [FeedUseCases],
})
export class AppModule {}

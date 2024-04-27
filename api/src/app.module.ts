import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FeedModule } from './feed/feed.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestLog } from './log/log.entity';
import { LogMiddleware } from './log/log.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({ isGlobal: true }),
    FeedModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [RequestLog],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([RequestLog]),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestLog } from './log.entity';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(RequestLog)
    private readonly logRepository: Repository<RequestLog>,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    const { method, originalUrl: url } = req;
    const start = Date.now();

    res.on('finish', async () => {
      const { statusCode } = res;
      const end = Date.now();
      const logEntry = new RequestLog();
      logEntry.timestamp = new Date();
      logEntry.method = method;
      logEntry.url = url;
      logEntry.responseStatus = statusCode;
      logEntry.responseTime = `${end - start}ms`;

      await this.logRepository.save(logEntry);
    });

    next();
  }
}

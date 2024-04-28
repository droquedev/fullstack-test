import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Feed } from '../feed/feed.entity';

@Injectable()
export class OpenAiService {
  private openAiClient;
  constructor() {
    this.openAiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });
  }

  async translate(feeds: Feed[], to: string): Promise<Feed[]> {
    const feedsTranslated = await Promise.all(
      feeds.map(async (feed) => {
        const completion = await this.openAiClient.chat.completions.create({
          model: 'gpt-3.5-turbo-16k',
          messages: [
            {
              role: 'system',
              content: `You are a translator you should translate from en to ${to}, you will receive title|description translate them separately, just answer with the translated text in the same format, do not add anything else to the output`,
            },
            {
              role: 'user',
              content: `${feed.title}|${feed.description}`,
            },
          ],
        });
        const message = completion.choices[0].message.content;
        const [goodPart] = message.split('\n');
        const [title, description] = goodPart.split('|');

        return new Feed(
          feed.id,
          title,
          description,
          feed.extract,
          feed.thumbnail,
          feed.date,
          feed.url,
        );
      }),
    );

    return feedsTranslated;
  }
}

export class OpenAiServiceMock {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async translate(feeds: Feed[], to: string): Promise<Feed[]> {
    return feeds;
  }
}

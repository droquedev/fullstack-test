type Thumbnail = {
  source: string;
  width: number;
  height: number;
};

export class Feed {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly extract: string,
    public readonly thumbnail: Thumbnail | null,
    public readonly date: string,
    public readonly url: string,
  ) {}
}

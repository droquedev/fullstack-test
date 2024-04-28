export type HandleInputChange = (e: { value: string; name: string }) => void;

type Thumbnail = {
  source: string;
  width: number;
  height: number;
};

export type Feed = {
  id: string,
  title: string,
  description: string,
  extract: string,
  thumbnail: Thumbnail | null,
  date: string,
  url: string,
}

export type Language = {
  code: string;
  name: string;
}
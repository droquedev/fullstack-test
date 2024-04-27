import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FeedQueryDto {
  @ApiProperty({ type: Number, example: 2024 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Optional()
  public year: number;

  @ApiProperty({ type: Number, example: 4 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Optional()
  public month: number;

  @ApiProperty({ type: Number, example: 23 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Optional()
  public day: number;
}

export class FeedLangDto {
  @ApiProperty({ type: String, example: 'en' })
  public lang: string;
}

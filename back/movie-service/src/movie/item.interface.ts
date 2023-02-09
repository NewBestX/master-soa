import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { IsString, IsInt } from 'class-validator';

export class Item implements InMemoryDBEntity {
  @IsString() id: string;
  @IsString() room: string;
  @IsString() title: string;
  @IsString() year: string;
  @IsString() imdbId: string;
  @IsString() imageUrl: string;
  @IsString() imdbRating?: string;
}

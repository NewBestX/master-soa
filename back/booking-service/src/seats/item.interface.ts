import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import {IsString, IsInt} from 'class-validator';

export class Item implements InMemoryDBEntity {
  @IsInt() id: string;
  @IsString() reservedUser: string;
  @IsString() room: string;
}

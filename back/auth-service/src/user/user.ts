import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { IsString } from 'class-validator';

export class User implements InMemoryDBEntity {
  @IsString() id: string;
  @IsString() username: string;
  @IsString() password: string;
}

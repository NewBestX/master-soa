import {IsInt, IsString} from 'class-validator';

export class CreateItem {
  @IsInt() id: string;
  @IsString() reservedUser: string;
  @IsString() room: string;
}

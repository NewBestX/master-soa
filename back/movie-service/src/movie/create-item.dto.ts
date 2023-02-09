import {IsString} from 'class-validator';

export class CreateItem {
    @IsString() id: string;
    @IsString() room: string;
    @IsString() title: string;
    @IsString() year: string;
    @IsString() imdbId: string;
    @IsString() imageUrl: string;
    @IsString() imdbRating?: string;
}

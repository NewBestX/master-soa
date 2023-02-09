import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    GoneException, Inject,
    NotFoundException,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import {ItemService} from './item.service';
import {Item} from './item.interface';
import {AuthGuard} from "../auth/auth.guard";
import {ClientProxy} from '@nestjs/microservices';
import {timeout} from "rxjs/operators";

@UseGuards(AuthGuard)
@Controller('api/movie')
export class ItemController {
    constructor(
        private readonly itemService: ItemService,
        @Inject('IMDB_CLIENT') private readonly client: ClientProxy
    ) {
    }

    @Get()
    async getMovie(): Promise<Item> {
        const movie = this.itemService.getMovie();
        try {
            movie.imdbRating = await this.client.send(
                {role: 'rating', cmd: 'get'},
                {imdbId: movie.imdbId})
                .pipe(timeout(5000))
                .toPromise<string>();

            return movie;
        } catch (err) {
            console.error(err);
            movie.imdbRating = '-';
            return movie;
        }
    }
}

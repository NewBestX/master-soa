import {Controller} from '@nestjs/common';
import {ImdbService} from './imdb.service';
import {MessagePattern} from "@nestjs/microservices";

@Controller()
export class ImdbController {
    constructor(
        private readonly itemService: ImdbService,
    ) {
    }

    @MessagePattern({role: 'rating', cmd: 'get'})
    async getRating(data) {
        const obj = await this.itemService.getImdbObject(data.imdbId);
        return obj.data.imdbRating;
    }
}

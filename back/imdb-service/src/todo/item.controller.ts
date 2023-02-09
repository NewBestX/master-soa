import {Controller} from '@nestjs/common';
import {ItemService} from './item.service';
import {MessagePattern} from "@nestjs/microservices";

@Controller()
export class ItemController {
    constructor(
        private readonly itemService: ItemService,
    ) {
    }

    @MessagePattern({role: 'rating', cmd: 'get'})
    async getRating(data) {
        const obj = await this.itemService.getImdbObject(data.imdbId);
        return obj.imdbRating;
    }
}

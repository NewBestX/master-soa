import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    GoneException,
    NotFoundException,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import {ItemService} from './item.service';
import {Item} from './item.interface';
import {CreateItem} from './create-item.dto';
import {ItemWsGateway} from './item-ws.gateway';
import {AuthGuard} from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('api/seat')
export class ItemController {
    constructor(
        private readonly itemService: ItemService,
        private readonly itemWsGateway: ItemWsGateway,
    ) {
    }

    @Get('/:room')
    async findAll(@Param('room') room: string): Promise<Item[]> {
        const itm = this.itemService.findAll(room);
        return itm.map(x => ({id: x.id, reservedUser: x.reservedUser}));
    }

    @Post()
    async create(@Body() dto: CreateItem): Promise<Item> {
        if (this.itemService.findOne(dto.room, dto.id) != null)
            throw new ConflictException();

        const item = this.itemService.create(dto);

        this.itemWsGateway.broadcast({event: 'created', payload: item});
        return item;
    }

    @Delete('/:room/:id')
    async delete(@Param('room') room: string, @Param('id') id: string): Promise<void> {
        const item = this.itemService.findOne(room, id);
        if (!item) {
            throw new GoneException();
        }
        this.itemService.delete(room, id);
        this.itemWsGateway.broadcast({event: 'deleted', payload: id});
    }
}

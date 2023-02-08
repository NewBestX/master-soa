import {Injectable} from '@nestjs/common';
import {Item} from './item.interface';
import {CreateItem} from './create-item.dto';
import {InjectInMemoryDBService, InMemoryDBService} from '@nestjs-addons/in-memory-db';

@Injectable()
export class ItemService {
    constructor(@InjectInMemoryDBService('item') private readonly db: InMemoryDBService<Item>) {
        this.create({id: "14", reservedUser: "test3", room: "1"});
    }

    findAll(room: string): Item[] {
        return this.db.getAll().filter(x => x.room === room);
    }

    findOne(room: string, id: string): Item {
        const it = this.db.getAll().filter(x => x.room === room && x.id === id);
        if (!it)
            return null;
        return it[0];
    }

    create(dto: CreateItem): Item {
        const item = {
            id: dto.id,
            reservedUser: dto.reservedUser,
            room: dto.room
        };
        return this.db.create(item);
    }

    delete(room: string, id: string) {
        this.db.delete(id);
    }
}

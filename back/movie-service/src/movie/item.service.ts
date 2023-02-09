import {Injectable} from '@nestjs/common';
import {Item} from './item.interface';
import {CreateItem} from './create-item.dto';
import {InjectInMemoryDBService, InMemoryDBService} from '@nestjs-addons/in-memory-db';

@Injectable()
export class ItemService {
    constructor(@InjectInMemoryDBService('item') private readonly db: InMemoryDBService<Item>) {
        this.create(
            {
                id: '1',
                room: '1',
                title: 'The Shawshank Redemption',
                year: '1994',
                imdbId: 'tt0111161',
                imageUrl: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX190_CR0,0,190,281_.jpg'
            });
    }

    getMovie(): Item {
        return this.db.getAll()[0];
    }

    create(dto: CreateItem): Item {
        const item = {
            id: dto.id,
            room: dto.room,
            title: dto.title,
            year: dto.year,
            imdbId: dto.imdbId,
            imageUrl: dto.imageUrl
        };
        return this.db.create(item);
    }
}

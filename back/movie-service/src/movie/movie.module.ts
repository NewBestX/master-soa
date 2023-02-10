import {Module} from '@nestjs/common';
import {ItemController} from './item.controller';
import {ItemService} from './item.service';
import {InMemoryDBModule} from '@nestjs-addons/in-memory-db';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        InMemoryDBModule.forFeature('item', {}),
        ClientsModule.register([{
            name: 'AUTH_CLIENT',
            transport: Transport.TCP,
            options: {
                host: 'auth-service',
                port: 4000
            }
        }]),
        ClientsModule.register([{
            name: 'IMDB_CLIENT',
            transport: Transport.TCP,
            options: {
                host: 'imdb-service',
                port: 4001
            }
        }])
    ],
    controllers: [ItemController],
    providers: [ItemService]
})
export class MovieModule {
}

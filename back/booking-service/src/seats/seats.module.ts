import {Module} from '@nestjs/common';
import {ItemController} from './item.controller';
import {ItemService} from './item.service';
import {InMemoryDBModule} from '@nestjs-addons/in-memory-db';
import {ItemWsGateway} from './item-ws.gateway';
import {ClientsModule, Transport} from '@nestjs/microservices';

@Module({
    imports: [
        InMemoryDBModule.forFeature('item', {}),
        ClientsModule.register([{
            name: 'AUTH_CLIENT',
            transport: Transport.TCP,
            options: {
                host: '172.20.0.13',
                port: 4000
            }
        }])
    ],
    controllers: [ItemController],
    providers: [ItemService, ItemWsGateway]
})
export class SeatsModule {
}

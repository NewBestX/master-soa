import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {WsAdapter} from '@nestjs/platform-ws';
import {Transport} from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useWebSocketAdapter(new WsAdapter(app));

    app.connectMicroservice({
        transport: Transport.TCP,
        options: {
            host: 'auth-service',
            port: 4000
        }
    });

    await app.startAllMicroservicesAsync();
    await app.listen(3001);
}

bootstrap();

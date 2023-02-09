import { Module } from '@nestjs/common';
import { ExternalApiModule } from './todo/externalApi.module';
import { CoreModule } from './core/core.module';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';


@Module({
  imports: [
    InMemoryDBModule.forRoot(),
    ExternalApiModule,
    CoreModule,
  ],
})
export class AppModule {}

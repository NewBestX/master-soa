import { Module } from '@nestjs/common';
import { ExternalApiModule } from './imdbData/externalApi.module';
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

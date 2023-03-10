import { Module } from '@nestjs/common';
import { SeatsModule } from './seats/seats.module';
import { CoreModule } from './core/core.module';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';


@Module({
  imports: [
    InMemoryDBModule.forRoot(),
    SeatsModule,
    CoreModule,
  ],
})
export class AppModule {}

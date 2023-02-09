import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { CoreModule } from './core/core.module';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [
    InMemoryDBModule.forRoot(),
    MovieModule,
    CoreModule,
  ],
})
export class AppModule {}

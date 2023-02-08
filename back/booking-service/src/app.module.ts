import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { CoreModule } from './core/core.module';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';


@Module({
  imports: [
    InMemoryDBModule.forRoot(),
    TodoModule,
    CoreModule,
  ],
})
export class AppModule {}

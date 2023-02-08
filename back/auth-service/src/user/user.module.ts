import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [
    InMemoryDBModule.forFeature('user', {}),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

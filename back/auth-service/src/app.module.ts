import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    InMemoryDBModule.forRoot(),
    CoreModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}

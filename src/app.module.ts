import { Module } from '@nestjs/common';
import { ChatProvider } from './client/chat.provider';
import { AppController } from './app.controller';

@Module({
  imports: [],
  providers: [ChatProvider],
  controllers: [AppController],
})
export class AppModule {}

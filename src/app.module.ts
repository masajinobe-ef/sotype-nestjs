import { Module } from '@nestjs/common';
import { ChatGateway } from './client/chat.gateway';
import { ChatController } from './app/chat.controller';

@Module({
  imports: [],
  providers: [ChatGateway],
  controllers: [ChatController],
})
export class AppModule {}

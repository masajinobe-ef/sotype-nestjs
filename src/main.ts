import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as http from 'http';
import { SocketServer } from './server/socket.server';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.useStaticAssets(join(__dirname, '..', 'dist'), {
      prefix: '/dist/',
    });

    const port = process.env.PORT || 40800;

    const server = http.createServer(app.getHttpAdapter().getInstance());

    const socketServer = new SocketServer(server);

    server.listen(port, () => {
      console.log(`Приложение работает на: http://localhost:${port}`);
    });

    const io = socketServer.getIo();

    io.on('connection', (socket) => {
      console.log('Новое подключение:', socket.id);
    });
  } catch (error) {
    console.error('Ошибка при запуске приложения:', error);
  }
}

bootstrap();

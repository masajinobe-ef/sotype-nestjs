import { Server as SocketIOServer, Socket } from 'socket.io';
import http from 'http';

interface CustomSocket extends Socket {
  username?: string;
}

export class SocketServer {
  private io: SocketIOServer;
  private connectedUsers: CustomSocket[] = [];
  private userCount = 0;

  constructor(server: http.Server) {
    this.io = new SocketIOServer(server);
    this.initialize();
  }

  private initialize() {
    this.io.on('connection', (socket: CustomSocket) => {
      console.log('Новый клиент подключен');

      socket.on('newUser', (username: string) => {
        socket.username = username;
        this.connectedUsers.push(socket);
        this.userCount++;
        this.io.emit('userCount', this.userCount);
        this.io.emit(
          'userList',
          this.connectedUsers.map((user) => user.username),
        );
      });

      socket.on('message', (messageData) => {
        socket.broadcast.emit('message', messageData);
      });

      socket.on('disconnect', () => {
        console.log('Клиент отключен');
        this.userCount--;
        this.connectedUsers = this.connectedUsers.filter(
          (user) => user !== socket,
        );
        this.io.emit('userCount', this.userCount);
        this.io.emit(
          'userList',
          this.connectedUsers.map((user) => user.username),
        );
      });

      socket.on('error', (error) => {
        console.error(`Ошибка Socket.IO: ${error}`);
      });
    });
  }

  public getIo() {
    return this.io;
  }
}

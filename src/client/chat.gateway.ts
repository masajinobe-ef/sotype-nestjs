import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface CustomSocket extends Socket {
  username?: string;
}

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private connectedUsers: CustomSocket[] = [];
  private userCount = 0;

  handleConnection(socket: CustomSocket) {
    console.log('New client connected:', socket.id);
  }

  handleDisconnect(socket: CustomSocket) {
    console.log('Client disconnected:', socket.id);
    this.userCount--;
    this.connectedUsers = this.connectedUsers.filter((user) => user !== socket);
    this.updateUserCountAndList();
  }

  @SubscribeMessage('newUser')
  handleNewUser(socket: CustomSocket, username: string) {
    socket.username = username;
    this.connectedUsers.push(socket);
    this.userCount++;
    this.updateUserCountAndList();
  }

  @SubscribeMessage('message')
  handleMessage(
    socket: CustomSocket,
    messageData: { username: string; text: string },
  ) {
    socket.broadcast.emit('message', messageData);
  }

  private updateUserCountAndList() {
    this.server.emit('userCount', this.userCount);
    this.server.emit(
      'userList',
      this.connectedUsers.map((user) => user.username),
    );
  }
}

// app.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { Response, Request } from 'express';

describe('ChatController', () => {
  let chatController: ChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
    }).compile();

    chatController = module.get<ChatController>(ChatController);
  });

  it('should return HTML file on GET /', () => {
    const req = {} as Request;
    const res = {
      sendFile: jest.fn(),
    } as unknown as Response;

    chatController.getHome(req, res);
    expect(res.sendFile).toHaveBeenCalledWith(expect.any(String));
  });
});

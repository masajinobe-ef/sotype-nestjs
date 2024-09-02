import { Controller, Get, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { join } from 'path';

@Controller()
export class ChatController {
  @Get()
  getHome(@Req() req: Request, @Res() res: Response): void {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  }

  @Get('about')
  getAbout(@Res() res: Response): void {
    res.send('This is the about page.');
  }
}

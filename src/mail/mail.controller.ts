import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-quote')
  async sendQuote(@Body() body: any) {
    return this.mailService.sendQuoteEmail(body);
  }
}

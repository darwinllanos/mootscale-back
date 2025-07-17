import { Controller, Post, Body, Get } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';

@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Post()
  async handleSubscribe(@Body() dto: CreateSubscribeDto) {
    const message = await this.subscribeService.handleSubscribe(dto.email);
    return { message };
  }

  @Get()
  getSubscribe() {
    return { message: 'Subscribe endpoint is active' };
  }
}

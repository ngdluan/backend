import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Application health')
export class AppController {

  @Get()
  getHello(): ({ status: string }) {
    return ({ status: 'ok' });
  }
}

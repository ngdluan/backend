import { Controller, Post, UseGuards, Get, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard'
import { LocalAuthGuard } from './local-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  async test(@Request() req) {
    return req.user
  }
}

import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import {MessagePattern} from "@nestjs/microservices";


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @MessagePattern({ role: 'auth', cmd: 'check'})
  async loggedIn(data) {
    console.log("Validating token");
    try {
      const res = this.authService.validateToken(data.jwt);
      console.log("Token valid!");

      return res;
    } catch(e) {
      console.log("Invalid token: ", e);
      return false;
    }
  }
}

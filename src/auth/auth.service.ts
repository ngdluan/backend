import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
  }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.user({ email });
    if (user) {
      const check = await bcrypt.compare(pass, user.hash)
      if (!check) return null
      const { hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { id: user.id }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}

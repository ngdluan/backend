import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service'
import bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {
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
}

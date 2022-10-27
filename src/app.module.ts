import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, ProductModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }

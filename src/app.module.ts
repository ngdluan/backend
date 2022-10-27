import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [UserModule, ProductModule, AuthModule, CartModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }

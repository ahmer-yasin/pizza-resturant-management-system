import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Topping } from './entities/topping.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Topping])
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}

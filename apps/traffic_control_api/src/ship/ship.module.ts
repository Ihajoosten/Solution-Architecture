import { Module } from '@nestjs/common';
import { ShipController } from './ship.controller';
import { ShipService } from './ship.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IShipService } from '../interfaces/IShipService';
import { Ship } from './ship.model';

@Module({
  imports: [TypeOrmModule.forFeature([Ship])],
  providers: [
    {
      provide: IShipService,
      useClass: ShipService
    }
  ],
  controllers: [ShipController],
})
export class ShipModule {
  // public configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes({ path: 'dock', method: RequestMethod.GET }, { path: 'dock', method: RequestMethod.PUT });
  // }
}

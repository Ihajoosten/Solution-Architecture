import { Module } from '@nestjs/common';
import { TugboatController } from './tugboat.controller';
import { TugboatService } from './tugboat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ITugboatService } from '../../interfaces/ITugboat.service';
import { Tugboat } from './entities/tugboat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tugboat])],
  providers: [
    {
      provide: ITugboatService,
      useClass: TugboatService
    }
  ],
  controllers: [TugboatController],
})
export class TugboatModule {
  // public configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes({ path: 'dock', method: RequestMethod.GET }, { path: 'dock', method: RequestMethod.PUT });
  // }
}

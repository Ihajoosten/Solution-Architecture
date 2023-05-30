import { Module } from '@nestjs/common';
import { DockRentalController } from './dock_rental.controller';
import { DockRentalService } from './dock_rental.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { LeaseAgreement } from './entities/lease-agreement.entity';
import { ShippingCompany } from './entities/shipping-company.entity';
import { Dock } from './entities/dock.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [Dock, LeaseAgreement, ShippingCompany],
        synchronize: false,
        migrationsRun: false
      }),
    })
  ],
  controllers: [DockRentalController],
  providers: [DockRentalService],
})
export class DockRentalModule { }


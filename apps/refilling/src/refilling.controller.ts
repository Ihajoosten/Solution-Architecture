import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { RefillingService } from './refilling.service';
import { Ship } from '../models/ship.model';

@Controller()
export class RefillingController {
  constructor(private readonly refillingService: RefillingService) {}

  //EP-R-01 ShipRegistered: Add new ship to internal list. 
  @MessagePattern({ exchange: 'ship-registered', routingKey: 'event.ship-registered' })
  async handleShipRegistered(
    @Payload() content: string,
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      const jsonData = JSON.parse(content);
      const shipData = jsonData.data.shipData;
      const refillServiceData = jsonData.data.refillServiceData; 
      await this.refillingService.createShip(shipData, refillServiceData);
      context.getChannelRef().ack(context.getMessage()); // Acknowledge the message
    } catch (error) {
      console.error(error);
    }
  }

  //EP-R-02	ShipHasDocked:	Notify internal systems of arrived ship, perform relevant refilling activity.
  @MessagePattern({ exchange: 'ship-has-docked', routingKey: 'event.ship-has-docked' })
  async handleShipHasDocked(
    @Payload() content: string,
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      
      const jsonData = JSON.parse(content);
      const shipData = jsonData.data.shipData;
      const refillServiceData = jsonData.data.refillServiceData;
      
      await this.refillingService.notifyShipHasDocked(shipData, refillServiceData);
      context.getChannelRef().ack(context.getMessage());
    } catch (error) {
      console.error(error);
    }
  }

  //EP-R-03	PlanningHasUpdated:	Update internal planning.
  @MessagePattern({ exchange: 'planning-has-updated', routingKey: 'event.planning-has-updated' })
  async handlePlanningHasUpdated(
    @Payload() content: string,
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      const jsonData = JSON.parse(content);
      const trafficPlanningData = jsonData.data.trafficPlanningData;
      await this.refillingService.updatePlanning(trafficPlanningData);
      context.getChannelRef().ack(context.getMessage());
    } catch (error) {
      console.error(error);
    }
  }

  //EP-R-04	ShipHasBeenRecharged:	Update internal state of ship to recharged.
  @MessagePattern({ exchange: 'ship-has-recharged', routingKey: 'event.ship-has-recharged' })
  async handleShipHasRecharged(
    @Payload() content:any,
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      const jsonData = JSON.parse(content);
      const shipData = jsonData.data.shipData;
      const refillServiceData = jsonData.data.refillServiceData;
      await this.refillingService.updateShip(shipData, refillServiceData);
      //Update internal systems and planning

      context.getChannelRef().ack(context.getMessage()); // Acknowledge the message
    } catch (error) {
      console.error(error);
    }
  }

  //EP-R-05	ShipHasBeenRefuelled:	Update internal state of ship to refuelled.
  @MessagePattern({ exchange: 'ship-has-refuelled', routingKey: 'event.ship-has-refuelled' })
  async handleShipHasRefuelled(
    @Payload() content: any,
    @Ctx() context: RmqContext, // Context to acknowledge the message
  ): Promise<void> {
    try {
      const jsonData = JSON.parse(content);
      const shipData = jsonData.data.shipData;
      const refillServiceData = jsonData.data.refillServiceData;
      await this.refillingService.updateShip(shipData, refillServiceData);
      //Update internal systems and planning
      context.getChannelRef().ack(context.getMessage()); // Acknowledge the message
    } catch (error) {
      console.error(error);
    }
  }
}

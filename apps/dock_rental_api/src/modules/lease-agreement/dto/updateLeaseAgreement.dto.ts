import { IsNotEmpty } from "class-validator";
import { Dock } from "../../dock/dock.entity";
import { ShippingCompany } from "../../shipping-company/shipping-company.entity";

export class UpdateLeaseAgreementDTO {

  @IsNotEmpty()
  public readonly id: number;

  @IsNotEmpty()
  public readonly name: string;

  @IsNotEmpty()
  public readonly dock: Dock;

  @IsNotEmpty()
  public readonly shippingCompany: ShippingCompany;

  @IsNotEmpty()
  public readonly uuid: number;

  @IsNotEmpty()
  public readonly signDate: Date;


  @IsNotEmpty()
  public readonly validUntil: Date;

  @IsNotEmpty()
  public readonly price: number;

  constructor(id: number, name: string, dock: Dock, shippingCompany: ShippingCompany, uuid: number, signDate: Date, validUntil: Date, price: number) {
    this.id = id;
    this.name = name;
    this.dock = dock;
    this.shippingCompany = shippingCompany;
    this.uuid = uuid;
    this.signDate = signDate;
    this.validUntil = validUntil;
    this.price = price;
  }
}
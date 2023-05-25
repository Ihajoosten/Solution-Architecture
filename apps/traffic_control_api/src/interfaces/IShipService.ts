import { Ship } from "../models/ship.model";

export interface IShipService {
  createShip(Ship: Ship): void;
  getShipById(id: number): Ship;
  getAllShips(): Array<Ship>;
  updateShipById(id: number, updateShip: Ship): void;
  deleteShipById(id: number): void;
}
import { List } from "immutable";
import { AsyncState } from "widgets-for-react";
import { ShipInFleet } from "../../App";

export type Ship = {
  name: string;
  model: string;
  cost_in_credits: string;
  url: string;
  crew: string;
  passengers: string;
};

export type ShipState = {
  ship: AsyncState<Ship[]>;
};

export type ShipProps = {
  onChange: (ship: Ship) => void;
  selectedShip: Ship | undefined;
  amount: number;
  isSelected: boolean;
  shipsInFleet: List<ShipInFleet>;
  shipAlreadyInfleet?: boolean;
  oldAmountOfShips?: number;
};

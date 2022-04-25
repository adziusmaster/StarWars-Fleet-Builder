import { List } from "immutable";
import { ShipInFleet } from "../../App";

export type SummaryProps = {
  shipList: List<ShipInFleet>;
  fleetBuilt: boolean;
  resetFleet: () => void;
  removeOneShip: (selectedShip: ShipInFleet) => void;
  changeAmountOfOneShip: (selectedShip: ShipInFleet) => void;
  className?: string;
};

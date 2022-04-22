import {
  Action,
  any,
  async,
  fromJSX,
  loadingAsyncState,
  stateful,
} from "widgets-for-react";
import { fetchAllShips } from "./ShipApi";
import { Ship, ShipProps, ShipState } from "./ShipState";

const handleOnChange = (ships: Ship[], x?: string) => {
  const ship = ships.find((s) => s.url === x);
  return ship === undefined ? ships[0] : ship;
};

const ShipSelector = (props: ShipProps): JSX.Element =>
  stateful<ShipState>()((s0) =>
    any<Action<ShipState>>()([
      async<Ship[]>()(s0.ship).map((a) => (s1) => ({
        ...s1,
        ship: a(s1.ship),
      })),
      fromJSX((setState: (_: Action<ShipState>) => void) => {
        if (s0.ship.kind !== "loaded")
          return (
            <>
              <div key="LOADING">LOADING...</div>
            </>
          );
        let allShips: Ship[] = s0.ship.value;

        if (!props.isSelected && s0.ship.kind === "loaded")
          return (
            <>
              <select
                key="SELECT"
                defaultValue={"none"}
                onChange={(e) =>
                  props.onChange(
                    handleOnChange(allShips, e.currentTarget.value)
                  )
                }
              >
                <option value="none" key="disabledOption" disabled>
                  Choose a ship
                </option>
                {s0.ship.value.map((ship) => (
                  <option key={ship.url} value={ship.url}>
                    {ship.name}
                  </option>
                ))}
              </select>
            </>
          );

        if (props.shipAlreadyInfleet) {
          let oldValue = props.amount;
          let newValue = props.oldAmountOfShips;
          if (oldValue === newValue) {
            return (
              <>
                <span key="selectedShip">
                  You already have {oldValue} of {props.selectedShip?.name}!
                </span>
              </>
            );
          }
          return (
            <>
              <span key="selectedShip">
                Now you will have {props.amount} of {props.selectedShip?.name}!
              </span>
            </>
          );
        }

        if (props.isSelected && s0.ship.kind === "loaded")
          return (
            <>
              <span key="selectedShip">
                You will get {props.amount} of {props.selectedShip?.name}
              </span>
            </>
          );
        return (
          <>
            <span key="ERROR">ERROR</span>
          </>
        );
      }),
    ]).map((u) => u(s0))
  )({ ship: loadingAsyncState((_) => fetchAllShips()) }).run((n) => n.ship);

export default ShipSelector;

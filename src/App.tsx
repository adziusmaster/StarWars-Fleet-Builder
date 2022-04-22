import React from "react";
import "./App.css";
import { Action, fromJSX, Fun, stateful } from "widgets-for-react";
import { CounterProps } from "./Components/Counter/CounterState";
import CounterWidget from "./Components/Counter/CounterWidget";
import ButtonWidget from "./Components/Button/ButtonWidget";
import ShipSelector from "./Components/Ship/ShipWidget";
import InputWidget from "./Components/Input/InputWidget";
import { Ship } from "./Components/Ship/ShipState";
import { List } from "immutable";
import SummaryWidget from "./Components/Summary/SummaryWidget";

export type ShipInFleet = {
  ship: Ship | undefined;
  amount: number;
};

export type AppState = {
  data: CounterProps;
  nameChoosen: boolean;
  selectedShip?: Ship;
  fleet: List<ShipInFleet>;
  shipAlreadyInFleet?: boolean;
  fleetBuilt: boolean;
};

const Decrementer: Action<AppState> = (state: AppState) =>
  AppStateValueUpdater((v) => --v)(state);

const Incrementer: Action<AppState> = (state: AppState) =>
  AppStateValueUpdater((v) => ++v)(state);

const AppStateValueUpdater: Fun<Fun<number, number>, Action<AppState>> =
  (valueUpdater) => (s) => ({
    ...s,
    data: {
      ...s.data,
      value: valueUpdater(s.data.value) < 0 ? 0 : valueUpdater(s.data.value),
    },
  });

const ShipSelectorResetter: Action<AppState> = (state: AppState) => ({
  ...state,
  data: { ...state.data, value: 0 },
  selectedShip: undefined,
});

const FleetNameChanger: Fun<
  React.ChangeEvent<HTMLInputElement>,
  Action<AppState>
> = (event: React.ChangeEvent<HTMLInputElement>) => (state: AppState) => ({
  ...state,
  data: {
    ...state.data,
    title: event.currentTarget.value,
  },
});

const FleetNameSaver: Action<AppState> = (state: AppState) => ({
  ...state,
  nameChoosen: true,
});

const HandleShipChange: Fun<Ship, Action<AppState>> =
  (selectedShip: Ship) => (state: AppState) => {
    let newState: AppState = {
      ...state,
      selectedShip: selectedShip,
    };

    let oldState = state;
    let ship = oldState.fleet
      .filter((s) => s.ship !== undefined)
      .find((s) => (s.ship as Ship).name === selectedShip.name);
    if (ship !== undefined) {
      newState = {
        ...state,
        data: {
          ...state.data,
          value: ship.amount,
        },
        selectedShip: selectedShip,
        shipAlreadyInFleet: true,
      };
    }
    return newState;
  };

const ShipSaver: Action<AppState> = (state: AppState) => {
  let newState: AppState;
  if (state.shipAlreadyInFleet && state.data.value !== 0) {
    let updatedShipAmount = state.data.value;
    let shipToUpdate = state.fleet.find(
      (s) => (s.ship as Ship).name === (state.selectedShip as Ship).name
    );
    return (newState = {
      ...state,
      data: { ...state.data, value: 0 },
      selectedShip: undefined,
      fleet: state.fleet
        .delete(state.fleet.indexOf(shipToUpdate as ShipInFleet))
        .push({ ship: shipToUpdate?.ship, amount: updatedShipAmount }),
      shipAlreadyInFleet: false,
    });
  }
  if (state.shipAlreadyInFleet && state.data.value === 0) {
    let shipToUpdate = state.fleet.find(
      (s) => (s.ship as Ship).name === (state.selectedShip as Ship).name
    );
    return (newState = {
      ...state,
      data: { ...state.data, value: 0 },
      selectedShip: undefined,
      fleet: state.fleet.delete(
        state.fleet.indexOf(shipToUpdate as ShipInFleet)
      ),
      shipAlreadyInFleet: false,
    });
  }
  if (state.data.value === 0) {
    return (newState = {
      ...state,
    });
  }
  newState = {
    ...state,
    data: { ...state.data, value: 0 },
    selectedShip: undefined,
    fleet: state.fleet.push({
      ship: state.selectedShip,
      amount: state.data.value,
    }),
    shipAlreadyInFleet: false,
  };
  return newState;
};

const ShipRemover: Action<AppState> = (state: AppState) => {
  let newState: AppState;
  let shipToRemove = state.fleet.find(
    (s) => (s.ship as Ship).name === (state.selectedShip as Ship).name
  );
  return (newState = {
    ...state,
    data: { ...state.data, value: 0 },
    selectedShip: undefined,
    fleet: state.fleet.delete(state.fleet.indexOf(shipToRemove as ShipInFleet)),
    shipAlreadyInFleet: false,
  });
};
const FleetBuilder: Action<AppState> = (state: AppState) => ({
  ...state,
  fleetBuilt: true,
});

const ResetFleet: Action<AppState> = (state: AppState) => ({
  data: {
    title: "",
    value: 0,
  },
  nameChoosen: false,
  fleet: List<ShipInFleet>(),
  fleetBuilt: false,
  selectedShip: undefined,
  shipAlreadyInFleet: false,
});

const RemoveOneShip: Fun<ShipInFleet, Action<AppState>> =
  (shipToRemove: ShipInFleet) => (state: AppState) => {
    let newState: AppState;
    return (newState = {
      ...state,
      data: { ...state.data, value: 0 },
      selectedShip: undefined,
      fleet: state.fleet.delete(
        state.fleet.indexOf(shipToRemove as ShipInFleet)
      ),
      shipAlreadyInFleet: false,
    });
  };

const ChangeAmountOfOneShip: Fun<ShipInFleet, Action<AppState>> =
  (shipToUpdate: ShipInFleet) => (state: AppState) => {
    let newState: AppState;
    return (newState = {
      ...state,
      data: {
        ...state.data,
        value: shipToUpdate.amount,
      },
      selectedShip: shipToUpdate.ship,
      shipAlreadyInFleet: true,
    });
  };
const App = (): JSX.Element =>
  stateful<AppState>()((s0) =>
    fromJSX((setState: (_: Action<AppState>) => void) => (
      <>
        {!s0.fleetBuilt ? (
          <>
            {!s0.nameChoosen ? (
              <>
                {InputWidget({
                  titlePlaceholder: "Name your fleet",
                  onChange: (e) => setState((s0) => FleetNameChanger(e)(s0)),
                })}
                {ButtonWidget({
                  key: "save name",
                  onClick: () => setState((s0) => FleetNameSaver(s0)),
                  buttontext: "save name",
                  hidden: s0.data.title.length === 0,
                })}
              </>
            ) : (
              <>
                {CounterWidget({
                  title: s0.data.title,
                  value: s0.data.value,
                  hidden: s0.selectedShip === undefined,
                })}
                {!s0.shipAlreadyInFleet ? (
                  <>
                    {ShipSelector({
                      onChange: (e) =>
                        setState((s0) => HandleShipChange(e)(s0)),
                      selectedShip: s0.selectedShip,
                      shipsInFleet: s0.fleet,
                      isSelected: s0.selectedShip !== undefined,
                      amount: s0.data.value,
                      shipAlreadyInfleet: s0.shipAlreadyInFleet,
                    })}
                    {ButtonWidget({
                      key: "increment",
                      onClick: () => setState((s0) => Incrementer(s0)),
                      buttontext: "increment",
                      hidden: s0.selectedShip === undefined,
                    })}
                    {ButtonWidget({
                      key: "decrement",
                      onClick: () => setState((s0) => Decrementer(s0)),
                      buttontext: "decrement",
                      hidden:
                        s0.selectedShip === undefined || s0.data.value === 0,
                    })}
                    {ButtonWidget({
                      key: "choose another ship",
                      onClick: () => setState((s0) => ShipSelectorResetter(s0)),
                      buttontext: "choose another ship",
                      hidden:
                        s0.selectedShip === undefined && !s0.shipAlreadyInFleet,
                    })}
                    {ButtonWidget({
                      key: "save ship",
                      onClick: () => setState((s0) => ShipSaver(s0)),
                      buttontext: "save ship",
                      hidden: s0.data.value === 0 && s0.data.value === 0,
                    })}
                    {SummaryWidget({
                      shipList: s0.fleet,
                      fleetBuilt: s0.fleetBuilt,
                      resetFleet: () => null,
                      removeOneShip: (ship) =>
                        setState((s0) => RemoveOneShip(ship)(s0)),
                      changeAmountOfOneShip: (ship) =>
                        setState((s0) => ChangeAmountOfOneShip(ship)(s0)),
                    })}
                    {s0.fleet.size !== 0 ? (
                      <>
                        {ButtonWidget({
                          key: "build fleet",
                          onClick: () => setState((s0) => FleetBuilder(s0)),
                          buttontext: "build fleet!",
                        })}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    {ShipSelector({
                      onChange: (e) =>
                        setState((s0) => HandleShipChange(e)(s0)),
                      selectedShip: s0.selectedShip,
                      shipsInFleet: s0.fleet,
                      isSelected: s0.selectedShip !== undefined,
                      amount: s0.data.value,
                      shipAlreadyInfleet: s0.shipAlreadyInFleet,
                      oldAmountOfShips: s0.fleet.find(
                        (s) =>
                          (s.ship as Ship).name ===
                          (s0.selectedShip as Ship).name
                      )?.amount,
                    })}
                    {ButtonWidget({
                      key: "increment",
                      onClick: () => setState((s0) => Incrementer(s0)),
                      buttontext: "increment",
                      hidden: s0.selectedShip === undefined,
                    })}
                    {ButtonWidget({
                      key: "decrement",
                      onClick: () => setState((s0) => Decrementer(s0)),
                      buttontext: "decrement",
                      hidden:
                        s0.selectedShip === undefined || s0.data.value === 0,
                    })}
                    {ButtonWidget({
                      key: "remove this ship!",
                      onClick: () => setState((s0) => ShipRemover(s0)),
                      buttontext: "remove this ship!",
                      hidden:
                        s0.selectedShip === undefined || s0.data.value === 0,
                    })}
                    {ButtonWidget({
                      key: "save",
                      onClick: () => setState((s0) => ShipSaver(s0)),
                      buttontext: "save",
                      hidden: s0.selectedShip === undefined,
                    })}
                    {SummaryWidget({
                      shipList: s0.fleet,
                      fleetBuilt: s0.fleetBuilt,
                      resetFleet: () => null,
                      removeOneShip: (ship) =>
                        setState((s0) => RemoveOneShip(ship)(s0)),
                      changeAmountOfOneShip: (ship) =>
                        setState((s0) => ChangeAmountOfOneShip(ship)(s0)),
                    })}
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {SummaryWidget({
              shipList: s0.fleet,
              fleetBuilt: s0.fleetBuilt,
              resetFleet: () => setState((s0) => ResetFleet(s0)),
              removeOneShip: (ship) =>
                setState((s0) => RemoveOneShip(ship)(s0)),
              changeAmountOfOneShip: (ship) =>
                setState((s0) => ChangeAmountOfOneShip(ship)(s0)),
            })}
          </>
        )}
      </>
    )).map((u) => u(s0))
  )({
    data: {
      value: 0,
      title: "",
    },
    nameChoosen: false,
    fleet: List<ShipInFleet>(),
    fleetBuilt: false,
  }).run((s0) => s0);

export default App;

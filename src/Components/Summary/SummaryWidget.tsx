import { ShipInFleet } from "../../App";
import ButtonWidget from "../Button/ButtonWidget";
import ButtonWithStringWidget from "../Button/ButtonWidgetWithString";
import { Ship } from "../Ship/ShipState";
import { SummaryProps } from "./SummaryState";

const SummaryWidget = (props: SummaryProps) => {
  let ships = props.shipList.toArray();
  let totalCrew = 0;
  let totalPassengers = 0;
  ships
    .filter((c) => c.amount > 0 && c.ship !== undefined)
    .forEach((shipInFleet) => {
      let regexCrew = shipInFleet.ship?.crew
        .replace(/\,/g, "")
        .slice(
          shipInFleet.ship?.crew.indexOf("-") + 1,
          shipInFleet.ship?.crew.length
        );
      totalCrew += +(regexCrew ? regexCrew : 0) * shipInFleet.amount;
      let regexPassengers = shipInFleet.ship?.passengers
        .replace(/(n\/a)|(unknown)/g, "0")
        .replace(/\,/g, "");
      totalPassengers += +(regexPassengers ? regexPassengers : 0);
    });
  return (
    <>
      {!props.fleetBuilt ? (
        <>
          {ships.length > 0 ? (
            <ul>
              {ships.map((ship) => (
                <li key={ship.ship?.url}>
                  You got: {ship.amount} of {ship.ship?.name}
                  {ButtonWidget({
                    buttontext: "remove this ship!",
                    key: "remove this ship!",
                    onClick: () => props.removeOneShip(ship),
                  })}
                  {ButtonWidget({
                    buttontext: "change the amount",
                    key: "change the amount",
                    onClick: () => props.changeAmountOfOneShip(ship),
                  })}
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {ships.length > 0 ? (
            <>
              <ul>
                {ships.map((ship) => (
                  <li key={ship.ship?.url}>
                    You got: {ship.amount} of {ship.ship?.name}{" "}
                  </li>
                ))}
              </ul>
              <span>You will need {totalCrew} of Crew</span>
              <br></br>
              <span>You can transport {totalPassengers} of Passengers</span>
              <br></br>
              {ButtonWidget({
                buttontext: "build new fleet!",
                key: "build new fleet!",
                onClick: props.resetFleet,
              })}
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default SummaryWidget;

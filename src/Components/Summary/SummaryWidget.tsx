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
          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                <img
                  src="../../../public/starwarsicon.png"
                  alt=""
                  className="d-inline-block align-text-top"
                />
                Currently in your fleet:
              </a>
            </div>
          </nav>
          <ul className="list-group">
            {ships.map((ship) => (
              <li
                key={ship.ship?.url}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {ship.ship?.name}
                {ButtonWidget({
                  buttontext: "remove this ship!",
                  key: "remove this ship!",
                  onClick: () => props.removeOneShip(ship),
                  className: "btn btn-danger",
                })}
                {ButtonWidget({
                  buttontext: "change the amount",
                  key: "change the amount",
                  onClick: () => props.changeAmountOfOneShip(ship),
                  className: "btn btn-secondary",
                })}
                <span className="badge bg-primary rounded-pill">
                  {ship.amount}{" "}
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          {ships.length > 0 && (
            <>
              <ol className="list-group list-group-numbered">
                {ships.map((ship) => (
                  <li
                    key={ship.ship?.url}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{ship.ship?.name}</div>
                      Model: {ship.ship?.model}
                    </div>
                    <span className="badge bg-primary rounded-pill">
                      amount: {ship.amount}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="alert alert-success" role="alert">
                <span className="badge bg-warning text-dark">
                  You will need {totalCrew} of Crew
                </span>
                <br></br>
                <span className="badge bg-info text-dark">
                  You can transport {totalPassengers} of Passengers
                </span>
                <br></br>
              </div>

              {ButtonWidget({
                buttontext: "build new fleet!",
                key: "build new fleet!",
                onClick: props.resetFleet,
                className: "btn btn-primary",
              })}
            </>
          )}
        </>
      )}
    </>
  );
};

export default SummaryWidget;

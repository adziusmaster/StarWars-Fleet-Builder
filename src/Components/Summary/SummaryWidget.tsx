import { SummaryProps } from "./SummaryState";

const SummaryWidget = (props: SummaryProps) => {
  let ships = props.shipList.toArray();
  return (
    <>
      {ships.length > 0 ? (
        <>
          {ships.map((ship) => (
            <div key={ship.ship?.url}>
              You got: {ship.amount} of {ship.ship?.name}
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SummaryWidget;

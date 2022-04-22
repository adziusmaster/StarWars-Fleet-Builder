import { HttpResult } from "widgets-for-react";
import { Ship } from "./ShipState";

export const fetchShip = async (page: number): Promise<HttpResult<Ship[]>> => {
  try {
    let call = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
    let data = await call.json();

    return {
      kind: "result",
      status: 200,
      value: data.results as Ship[],
    };
  } catch (e) {
    console.warn(e);
    return { kind: "failed", status: 500 };
  }
};

export async function fetchAllShips(): Promise<HttpResult<Ship[]>> {
  let ships: Ship[] = [];
  let page: number = 1;
  while (page <= 4) {
    const newHttpResult = await fetchShip(page);
    if (newHttpResult.kind === "result") {
      ships = [...ships, ...newHttpResult.value];
    }
    page++;
  }
  ships = ships.filter((ship) => (ship as Ship).cost_in_credits !== "unknown");
  return { kind: "result", status: 200, value: ships };
}

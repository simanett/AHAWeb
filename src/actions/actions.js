export const LOAD_FLIGHTS = "LOAD_FLIGHTS";

export const updateFlights = (flights) => {
  return {
    type: LOAD_FLIGHTS,
    flights: flights,
  }
}
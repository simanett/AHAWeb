export const updateFlights = (flights) => {
  return {
    type: LOAD_FLIGHTS,
    flights: flights,
  }
}
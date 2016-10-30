const LOAD_FLIGHTS = "LOAD_FLIGHTS";
export const updateFlights = (flights) => {
  return {
    type: LOAD_FLIGHTS,
    flights: flights,
  }
}

const CHOOSE_FLIGHT = "CHOOSE_FLIGHT";
export const chooseFlight = (flight) => {
  return {
    type: CHOOSE_FLIGHT,
    chosenFlight: flight,
  }
}

const SET_PASSENGER = "SET_PASSENGER";
export const setPassenger = (passenger) => {
  return {
    type: SET_PASSENGER,
    passengerDetails: passenger,
  }
}

const SET_DEPARTURE_DATE = "SET_DEPARTURE_DATE";
export const setDepartureDate = (departureDate) => {
  return {
    type: SET_DEPARTURE_DATE,
    departureDate: departureDate,
  }
}
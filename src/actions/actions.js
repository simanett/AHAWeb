const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const setErrorMessage = (errorMessage) => {
  return {
    type: SET_ERROR_MESSAGE,
    errorMessage: errorMessage,
  }
}

const LOAD_FLIGHTS = "LOAD_FLIGHTS";
export const updateFlights = (flights) => {
  return {
    type: LOAD_FLIGHTS,
    flights: flights,
  }
}

const LOAD_AIRPORTS = "LOAD_AIRPORTS";
export const loadAirports = (airports) => {
  return {
    type: LOAD_AIRPORTS,
    airports: airports,
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

const LOAD_AIRPLANE = "LOAD_AIRPLANE";
export const loadAirplane = (airplane) => {
  return {
    type: LOAD_AIRPLANE,
    airplane: airplane,
  }
}

const SET_DEPARTURE_DATE = "SET_DEPARTURE_DATE";
export const setDepartureDate = (departureDate) => {
  return {
    type: SET_DEPARTURE_DATE,
    departureDate: departureDate,
  }
}

const SET_AIRPORT_FROM = "SET_AIRPORT_FROM";
export const setAirportFrom = (airportFrom) => {
  return {
    type: SET_AIRPORT_FROM,
    airportFrom: airportFrom,
  }
}

const SET_AIRPORT_TO = "SET_AIRPORT_TO";
export const setAirportTo = (airportTo) => {
  return {
    type: SET_AIRPORT_TO,
    airportTo: airportTo,
  }
}

const SEAT_BOOKING_REQUESTED = "SEAT_BOOKING_REQUESTED";
export const seatBookingRequested = (seatBookingRequested) => {
  return {
    type: SEAT_BOOKING_REQUESTED,
    seatBookingRequested: seatBookingRequested,
  }
}

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

const SET_VISIBLE_FLIGHTS = "SET_VISIBLE_FLIGHTS";
export const setVisibleFlights = (date) => {
  return {
    type: SET_VISIBLE_FLIGHTS,
    date: date,
  }
}

const SET_AIRPORT_FROM = "SET_AIRPORT_FROM";
export const setAirportFrom = (airportFrom) => {
  return {
    type: SET_AIRPORT_FROM,
    airportFrom: airportFrom,
  }
}

const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";
export const setActiveTab = (activeTab) => {
  return {
    type: SET_ACTIVE_TAB,
    activeTab: activeTab,
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

const RESET_SELECTION = "RESET_SELECTION";
export const resetSelection = () => {
  return {
    type: RESET_SELECTION
  }
}

const SAVE_AUTH_TOKEN = 'SAVE_AUTH_TOKEN';
export const saveAuthToken = (token, profile) => {
  return {
    type: SAVE_AUTH_TOKEN,
    token: token,
    profile: profile
  }
}

const SEAT_CHANGED = 'SEAT_CHANGED';
export const seatChanged = (seatId) => {
  return {
    type: SEAT_CHANGED,
    selectedSeat: seatId
  }
}

const CREATE_BOOKING_REQUEST = 'CREATE_BOOKING_REQUEST';
export const createBookingRequest = () => {
  return {
    type: CREATE_BOOKING_REQUEST,
    sendingRequest: true

  }
}

const CREATE_BOOKING_RESPONSE = 'CREATE_BOOKING_RESPONSE';
export const createBookingResponse = (response, isError) => {
  return {
    type: CREATE_BOOKING_RESPONSE,
    sendingRequest: false,
    response: response,
    isError: isError
  }
}

const RESET_BOOKING = "RESET_BOOKING";
export const resetBooking = () => {
  return {
    type: RESET_BOOKING
  }
}
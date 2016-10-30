import { combineReducers } from "redux";

export const flights = (state = [], action) => {
    switch (action.type) {
        case "LOAD_FLIGHTS":
            return action.flights
        default:
            return state
    }
}

export const chooseFlight = (state = {}, action) => {
    switch (action.type) {
        case "CHOOSE_FLIGHT":
            return action.chosenFlight
        default:
            return state
    }
}

let initPassengerState = {
    id: "",
    name: "",
    email: "",
}
export const passengerDetails = (state = initPassengerState, action) => {
    switch (action.type) {
        case "SET_PASSENGER":
            return action.passengerDetails
        default:
            return state
    }
}

let initSearchDetailsState = {
   from: "",
   to: "",
   departureDate: "",
   arrivalDate: "",
}
export const searchDetails = (state = initSearchDetailsState, action) => {
    switch (action.type) {
        case "SET_DEPARTURE_DATE":
            return Object.assign({}, state, {
                departureDate: action.departureDate,
            });
        default:
            return state
    }
}

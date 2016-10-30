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

export const passengerDetails = (state = {}, action) => {
    switch (action.type) {
        case "SET_PASSENGER":
            return action.passengerDetails
        default:
            return state
    }
}


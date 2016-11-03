import { combineReducers } from "redux";
import moment from "moment";

export const errorMessage = (state = "", action) => {
    switch (action.type) {
        case "SET_ERROR_MESSAGE":
            return action.errorMessage
        default:
            return state
    }
}


export const flights = (state = [], action) => {
    switch (action.type) {
        case "LOAD_FLIGHTS":
            return action.flights
        case "SET_VISIBLE_FLIGHTS":
            return state.map((flight) => {
                if (moment(flight.departure, "DD/MM/YYYY hh:mm").format("DD/MM/YYYY") === action.date) {
                    return Object.assign({}, flight, {
                        display: true,
                    })
                } else {
                    return Object.assign({}, flight, {
                        display: false,
                    })
                }
            })
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

export const airports = (state = [], action) => {
    switch (action.type) {
        case "LOAD_AIRPORTS":
            return action.airports
        default:
            return state
    }
}

export const airplane = (state = {}, action) => {
    switch (action.type) {
        case "LOAD_AIRPLANE":
            return action.airplane
        default:
            return state
    }
}

export const seatBookingRequested = (state = false, action) => {
    switch (action.type) {
        case "SEAT_BOOKING_REQUESTED":
            return action.seatBookingRequested
        default:
            return state
    }
}

let initSearchDetailsState = {
    activeTab: 1,
    airportFrom: "",
    airportTo: "",
    departureDate: "",
}
export const searchDetails = (state = initSearchDetailsState, action) => {
    switch (action.type) {
        case "SET_DEPARTURE_DATE":
            return Object.assign({}, state, {
                departureDate: action.departureDate,
            });
        case "SET_AIRPORT_FROM":
            return Object.assign({}, state, {
                airportFrom: action.airportFrom,
            });
        case "SET_AIRPORT_TO":
            return Object.assign({}, state, {
                airportTo: action.airportTo,
            });
        case "SET_ACTIVE_TAB":
            return Object.assign({}, state, {
                activeTab: action.activeTab,
            });
        default:
            return state
    }
}


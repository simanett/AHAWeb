import { combineReducers } from "redux";

export const flights = (state = [], action) => {
    switch (action.type) {
        case "LOAD_FLIGHTS":
            return action.flights
        default:
            return state
    }
}


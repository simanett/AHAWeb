import { combineReducers } from "redux";
/*
export const rootReducer = combineReducers({
    counter,
    flights,
});
*/
export const counter = (state = 1, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

export const flights = (state = {}, action) => {
    switch (action.type) {
        case "LOAD_FLIGHTS":
            return action.flights
        default:
            return state
    }
}
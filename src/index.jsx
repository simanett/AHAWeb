import React from 'react';
import * as ReactRouter from 'react-router';
import * as ReactDOM from 'react-dom';
import * as ReactRedux from "react-redux";

import { ConnectedApp } from './app.jsx';
import { ConnectedLogin } from './components/login';
import { ConnectedFlights } from './components/flights.jsx';
import { combineReducers, createStore } from "redux";
import { flights, airports, airplane, chooseFlight, seatBookingRequested, errorMessage, passengerDetails, searchDetails } from "./reducers/reducers";

const rootReducer = combineReducers({
    flights: flights,
    airports: airports,
    chosenAirplaneType: airplane,
    chosenFlight: chooseFlight,
    errorMessage: errorMessage,
    passengerDetails: passengerDetails,
    searchDetails: searchDetails,
    seatBookingRequested: seatBookingRequested,
});

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const render = () => {
    ReactDOM.render(
        <ReactRedux.Provider store={store} >
            <ReactRouter.Router history={ReactRouter.hashHistory}>
                <ReactRouter.Route path="/" component={ConnectedApp}>
                    <ReactRouter.IndexRoute component={ConnectedLogin} />
                    <ReactRouter.Route path="/login" component={ConnectedLogin} />
                    <ReactRouter.Route path="/flights" component={ConnectedFlights} />
                </ReactRouter.Route>
            </ReactRouter.Router>
        </ReactRedux.Provider>, document.getElementById("app"));
}

window.onload = () => render();

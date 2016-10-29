import React from 'react';
import * as ReactRouter from 'react-router';
import * as ReactDOM from 'react-dom';
import * as ReactRedux from "react-redux";

import { ConnectedApp } from './app.jsx';
import { ConnectedLogin } from './components/login';
import { ConnectedFlights } from './components/flights.jsx';
import { combineReducers, createStore } from "redux";
import { counter, flights } from "./reducers/reducers";

const rootReducer = combineReducers({
    counter,
    flights,
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

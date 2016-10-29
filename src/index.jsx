import React from 'react';
import * as ReactRouter from 'react-router';
import * as ReactDOM from 'react-dom';
import * as ReactRedux from "react-redux";

import App from './app.jsx';
import Login from './components/login';
import { ConnectedFlights } from './components/flights.jsx';
import { combineReducers, createStore } from "redux";
import { counter, flights } from "./reducers/reducers";

const rootReducer = combineReducers({
    counter,
    flights,
});


export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() =>
    console.log(store.getState())
);

console.log("store.getstate", store.getState())

const render = () => {
    ReactDOM.render(
        <ReactRedux.Provider store={store} >
            <ReactRouter.Router history={ReactRouter.hashHistory}>
                <ReactRouter.Route path="/" component={App}>
                    <ReactRouter.IndexRoute component={Login} />
                    <ReactRouter.Route path="/login" component={Login} />
                    <ReactRouter.Route path="/flights" component={ConnectedFlights} />
                </ReactRouter.Route>
            </ReactRouter.Router>
        </ReactRedux.Provider>, document.getElementById("app"));
}

window.onload = () => render();

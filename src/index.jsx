import React from 'react';
import * as ReactRouter from 'react-router';
import * as ReactDOM from 'react-dom';
import App from './app.jsx';
import Login from './components/login';
import Flights from './components/flights.jsx';
import * as ReactRedux from "react-redux";
import {combineReducers, createStore} from "redux";

function counter(state = 1, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

function happy(state = 1, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

const rootReducer = combineReducers({
    counter,
    happy,
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
                    <ReactRouter.Route path="/flights" component={Flights} />
                </ReactRouter.Route>
            </ReactRouter.Router>
        </ReactRedux.Provider>, document.getElementById("app"));
}

window.onload = () => render();

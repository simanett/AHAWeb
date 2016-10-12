import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import { reducers } from './reducers/index';

import { sagas } from './sagas/index';
import App from './components/App';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Flights from './pages/Flights';

// create the store

const sagaMiddleware = createSagaMiddleware();
let middleware = applyMiddleware(routerMiddleware(browserHistory), sagaMiddleware);
if (process.env.NODE_ENV !== 'production') {
    middleware = compose(middleware, window.devToolsExtension && window.devToolsExtension());
}
export const store = createStore(reducers, middleware);
const history = syncHistoryWithStore(browserHistory, store);
sagaMiddleware.run(sagas);

// render the main component
const render = () => ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="login" component={Login}/>
                <Route path="flights" component={Flights}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

store.subscribe(render);

window.onload = () => render();

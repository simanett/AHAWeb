import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { render } from 'react-dom';
import App from './app.jsx';
import Login from './components/login';
import Flights from './components/flights.jsx';

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Login}/>
            <Route path="/login" component={Login}/>
            <Route path="/flights" component={Flights}/>
        </Route>
    </Router>
), document.getElementById('app'));

import React from 'react';
import { Nav, NavItem, Glyphicon } from 'react-bootstrap';
// import { Link } from 'react-router';
import NavLink from './navLink'

export default class Navbar extends React.Component {
    render() {
        return (
            <div id="navbar">
                <Nav className="ahaStyleLogin navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="/">
                            <Glyphicon glyph="plane"/> Air HelgAnett</a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul role="nav" className="nav navbar-nav">
                                <li><NavLink to="/login">Login <Glyphicon glyph="user"/></NavLink></li>
                                <li><NavLink to="/flights">Flights</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </Nav>
            </div>
        );
    }
}

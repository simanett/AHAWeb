import React from 'react';
import { Nav, NavItem, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';

export default class Navbar extends React.Component {
    render() {
        return (
            <div id="navbar">
                <Nav bsStyle="navbar navbar-inverse navbar-fixed-top">
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
                            <ul className="nav navbar-nav">
                                <Link to="/login">
                                    <NavItem>
                                        Login <Glyphicon glyph="user"/>
                                    </NavItem>
                                </Link>
                                <Link to="/flights">
                                    <NavItem>
                                        Flights
                                    </NavItem>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </Nav>
            </div>
        );
    }
}

import React from "react";
import * as $ from "jquery";
import { Table } from 'react-bootstrap';
import * as ReactRedux from "react-redux";

import * as Actions from "../actions/actions";

var flights = require("../api/flightsData");

import { store } from "../index";

function getFlightsFromServletNew1() {
    return new Promise((resolve, reject) => {
        $.ajax({
            cache: false,
            dataType: "json",
            error: function (xhr, status, err) {
                reject(err);
            }.bind(this),
            success: function (data) {
                resolve(data);
            }.bind(this),
            url: "http://localhost:8080/AHAService/FlightServlet?action=getFlights",
        });
    });
}

function getFlightsFromServlet() {
    return new Promise((resolve, reject) => {
        $.ajax({
            cache: false,
            dataType: "json",
            error: function (xhr, status, err) {
                reject(err);
            }.bind(this),
            success: function (data) {
                resolve(data);
            }.bind(this),
            url: "https://www.foaas.com/gfy/Anett/Helga",
        });
    });
}

class Flights extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: "initial msg",
            flights: [{
                "flightNumber": "INIFLIGHT",
                "departure": "júl. 22, 2016",
                "flightDuration": 180,
                "airplane": {
                    "maxDistance": 10000,
                    "model": "Airbus A320",
                    "id": 2
                },
                "airportTo": {
                    "code": "BUD",
                    "city": "Budapest"
                },
                "airportFrom": {
                    "code": "NAN",
                    "city": "Nantes"
                },
                "id": 2,
                "basicPrice": 23000
            },],
        }
    }

    componentWillMount() {
        getFlightsFromServlet().then((result) => {
            this.setState({
                message: result.message,
                flights: [{
                    "flightNumber": "AHA1111",
                    "departure": "júl. 20, 2016",
                    "flightDuration": 30,
                    "airplane": {
                        "maxDistance": 10000,
                        "model": "Airbus A320",
                        "id": 2
                    },
                    "airportTo": {
                        "code": "BUD",
                        "city": "Budapest"
                    },
                    "airportFrom": {
                        "code": "NAN",
                        "city": "Nantes"
                    },
                    "id": 41,
                    "basicPrice": 45000
                }],
            });
        });
    }

    render() {
        getFlightsFromServletNew1().then((result) => {
            store.dispatch(Actions.updateFlights(result))
        });
        var jsonData = { message: "Golf foxtrot yankee, Anett.", subtitle: "- Helga" };

        return (
            <div id="flights">
                <h2>Flights</h2>
                <p>Counter: {this.props.counter}</p>
                <div key={jsonData.message}>{jsonData.message}</div>
                <h3>{this.state.message}</h3>
                <h3>{this.state.flights[0].flightNumber}</h3>
                <Table bordered hover responsive striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Flight number</th>
                            <th>Departure</th>
                            <th>Flight duration</th>
                            <th>Airplane</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.getFlights().map((flight, index) => {
                            return (
                                <tr key={index}>
                                    <td>{flight.id}</td>
                                    <td>{flight.flightNumber}</td>
                                    <td>{flight.departure}</td>
                                    <td>{flight.flightDuration}</td>
                                    <td>{flight.airplane.model}</td>
                                    <td>{flight.airportFrom.city}</td>
                                    <td>{flight.airportTo.city}</td>
                                    <td>{flight.basicPrice}</td>
                                </tr>
                            )
                        }) }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export const ConnectedFlights = ReactRedux.connect(
    (state) => ({
        counter: state.counter,
        flights: state.flights,
    })
)(Flights);
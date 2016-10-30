import React from "react";
import * as $ from "jquery";
import { Table } from 'react-bootstrap';
import * as ReactRedux from "react-redux";

import * as Actions from "../actions/actions";

import { store } from "../index";

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
            url: "http://localhost:8080/AHAService/FlightServlet?action=getFlights",
        });
    });
}

class Flights extends React.Component {

    componentDidMount() {
        getFlightsFromServlet().then((result) => {
            store.dispatch(Actions.updateFlights(result))
        });
    }

    render() {
        return (
            <div id="flights">
                <h2>Flights</h2>
                {this.props.flights.length > 0 &&
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
                            {this.props.flights.map((flight, index) => {
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
                }
            </div>
        );
    }
}

export const ConnectedFlights = ReactRedux.connect(
    (state) => ({
        flights: state.flights,
    })
)(Flights);
import React from 'react';
/*
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
*/
import { Table } from 'react-bootstrap';

// var flights = require("../api/flights");
var flights = require("../api/flightsData");

export default class Flights extends React.Component {
    render() {
        return (
            <div id="flights">
            <h2>Flights</h2>
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
                        { flights.getFlights().map((flight, index) => {
                            return (
                            <tr key={index}>
                                <td>{ flight.id }</td>
                                <td>{ flight.flightNumber }</td>
                                <td>{ flight.departure }</td>
                                <td>{ flight.flightDuration }</td>
                                <td>{ flight.airplane.model }</td>
                                <td>{ flight.airportFrom.city }</td>
                                <td>{ flight.airportTo.city }</td>
                                <td>{ flight.basicPrice }</td>
                            </tr>
                            )
                        }) }
                    </tbody>
                </Table>
            </div>
        );
    }
}

/*
// export the connected class
function mapStateToProps(state) {
    return {

    };
}
export default connect(mapStateToProps)(Flights);
*/

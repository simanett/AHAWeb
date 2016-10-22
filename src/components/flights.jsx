import React from 'react';
import * as $ from 'jquery';
/*
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
*/
import { Table } from 'react-bootstrap';

var flights = require("../api/flightsData");

function getFlightsFromServlet() {
    $.ajax({
        cache: false,
        dataType: "json",
        error: function (xhr, status, err) {
            console.log("ajax error");
        }.bind(this),
        success: function (data) {
            console.log("ajax success");
            console.log(data);
            return data;
        }.bind(this),
        url: "https://www.foaas.com/gfy/Anett/Helga",
    });
}

export default class Flights extends React.Component {
    render() {
        // var jsonData = getFlightsFromServlet();
        var jsonData = {message: "Golf foxtrot yankee, Anett.", subtitle: "- Helga"};
        return (
            <div id="flights">
                <h2>Flights</h2>
                <div key={jsonData.message}>{ jsonData.message }</div>
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

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
                                    <tr key={index} onClick={this.chooseFlight.bind(this)}>
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

    chooseFlight(event){
        let value = event.target.parentElement.firstChild.textContent;
        let parent = event.target.parentElement;
        let chosenFlight = {};
        chosenFlight.id = parent.cells.item(0).textContent;
        chosenFlight.flightNumber = parent.cells.item(1).textContent;
        chosenFlight.departure = parent.cells.item(2).textContent;
        chosenFlight.flightDuration = parent.cells.item(3).textContent;
        chosenFlight.airplane = parent.cells.item(4).textContent;
        chosenFlight.airportFrom = parent.cells.item(5).textContent;
        chosenFlight.airportTo = parent.cells.item(6).textContent;
        chosenFlight.basicPrice = parent.cells.item(7).textContent;
        
        if(parent){
            alert("flight chosen" + chosenFlight.id);
            store.dispatch(Actions.chooseFlight(chosenFlight));
            // alert("flight chosen" + parent.cells.length);
        }
    }
}

export const ConnectedFlights = ReactRedux.connect(
    (state) => ({
        flights: state.flights,
    })
)(Flights);
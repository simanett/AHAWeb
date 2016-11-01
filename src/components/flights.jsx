import React from "react";
import moment from "moment";
// require("moment/locale/hu");
import * as $ from "jquery";
import * as ReactRedux from "react-redux";
import * as Actions from "../actions/actions";
import "../css/aha.css";
import { store } from "../index";
import { Table, Button } from "react-bootstrap";
import { ConnectedFlightsFilter } from "./flightsFilter";
import { ConnectedErrorMessage } from "./errorMessage";
import { ConnectedFlightSelected } from "./flightSelected";
import { ConnectedSeatBooking } from "./seatBooking";


function getFlightsFromServlet() {
    return new Promise((resolve, reject) => {
        $.ajax({
            cache: false,
            dataType: "json",
            error: function (xhr, status, err) {
                reject(xhr.status);
            }.bind(this),
            success: function (data) {
                resolve(data);
            }.bind(this),
            url: "http://localhost:8080/AHAService/FlightServlet?action=getFlights",
        });
    });
}

function getAirplaneFromServlet(airplaneType) {
    return new Promise((resolve, reject) => {
        $.ajax({
            cache: false,
            dataType: "json",
            error: function (xhr, status, err) {
                reject(xhr.status);
            }.bind(this),
            success: function (data) {
                resolve(data);
            }.bind(this),
            url: "http://localhost:8080/AHAService/AirplaneServlet?action=getAirplaneByModel&model=" + airplaneType,
        });
    });
}

class Flights extends React.Component {

    componentDidMount() {
        getFlightsFromServlet().then((result) => {
            let formattedFlights = result.map((flight) => {
                return (
                    Object.assign({}, flight, {
                        departure: moment(flight.departure, "YYYY-MM-DDThh:mmZ").format("DD/MM/YYYY hh:mm"),
                    })
                )
            });
            // alert(result[0].departure + " : " + formattedFlights[0].departure);
            // store.dispatch(Actions.updateFlights(result))
            store.dispatch(Actions.updateFlights(formattedFlights))
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div id="flights">
                <h2>Flight booking</h2>
                { this.props.errorMessage.length > 0 &&
                    <ConnectedErrorMessage />
                }
                {this.props.airports.length === 0 &&
                    <p className="col-sm-12">Database unavailable.Please check back later.</p>}
                {this.props.flights.length > 0 && !this.props.seatBookingRequested &&
                    <div>
                        <ConnectedFlightsFilter />
                        { this.props.chosenFlight.id !== undefined &&
                            <ConnectedFlightSelected />
                        }
                        <Table bordered hover responsive striped id="flight-list">
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
                                        <tr key={index} onClick={this.chooseFlight.bind(this) }>
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
                }
                {this.props.seatBookingRequested &&
                    <ConnectedSeatBooking />
                }
            </div>
        );
    }

    chooseFlight(event) {
        let parent = event.target.parentElement;
        let chosenFlight = {
            id: parent.cells.item(0).textContent,
            flightNumber: parent.cells.item(1).textContent,
            departure: parent.cells.item(2).textContent,
            flightDuration: parent.cells.item(3).textContent,
            airplane: parent.cells.item(4).textContent,
            airportFrom: parent.cells.item(5).textContent,
            airportTo: parent.cells.item(6).textContent,
            basicPrice: parent.cells.item(7).textContent,
        }
        if (parent) {
            store.dispatch(Actions.chooseFlight(chosenFlight));
            getAirplaneFromServlet(chosenFlight.airplane).then((result) => {
                store.dispatch(Actions.loadAirplane(result));
            }).catch((error) => {
                console.log(error);
            });

        }
    }

}

export const ConnectedFlights = ReactRedux.connect(
    (state) => ({
        airports: state.airports,
        chosenFlight: state.chosenFlight,
        errorMessage: state.errorMessage,
        flights: state.flights,
        searchDetails: state.searchDetails,
        seatBookingRequested: state.seatBookingRequested,
    })
)(Flights);
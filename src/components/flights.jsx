import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import * as $ from "jquery";
import "react-datepicker/dist/react-datepicker.css";

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

function getAirportsFromServlet() {
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
            url: "http://localhost:8080/AHAService/AirportServlet?action=getAirports",
        });
    });
}

class Flights extends React.Component {

    componentDidMount() {
        getFlightsFromServlet().then((result) => {
            store.dispatch(Actions.updateFlights(result))
        });

        getAirportsFromServlet().then((result) => {
            store.dispatch(Actions.loadAirports(result))
        });

        store.dispatch(Actions.setDepartureDate(moment().format("YYYY MM DD")));
        store.dispatch(Actions.setArrivalDate(moment().format("YYYY MM DD")));
    }

    render() {
        let startDate = moment();
        return (
            <div id="flights">
                <h2>Flights</h2>
                <div className="form-group row" id="flight-search">
                    <div className="col-sm-3">
                        <label className="col-sm-12" >Departure: </label>
                        <DatePicker
                            className = "form-control"
                            selected = {moment(this.props.searchDetails.departureDate, "YYYY MM DD") }
                            onChange={this.setDepartureDate.bind(this) }
                            />
                    </div>
                    <div className="col-sm-3">
                        <label className="col-sm-12" >Arrival: </label>
                        <DatePicker
                            className = "form-control"
                            selected = {moment(this.props.searchDetails.arrivalDate, "YYYY MM DD") }
                            onChange={this.setArrivalDate.bind(this) }
                            />
                    </div>
                    {this.props.airports.length > 0 &&
                        <div className="col-sm-3">
                            <label className="col-sm-12" >From: </label>
                            <select
                                className="form-control"
                                id="airportFrom"
                                onChange={this.setAirportFrom.bind(this) }>
                                {this.props.airports.map((airport, index) => {
                                    return (
                                        <option key={index} >{airport.city}</option>
                                    )
                                }) }
                            </select>
                        </div>
                    }
                    {this.props.airports.length > 0 &&
                        <div className="col-sm-3">
                            <label className="col-sm-12" >To: </label>
                            <select
                                className="form-control"
                                id="airportTo"
                                onChange={this.setAirportTo.bind(this) }>
                                {this.props.airports.map((airport, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value ={airport.city}
                                            >{airport.city}
                                        </option>
                                    )
                                }) }
                            </select>
                        </div>
                    }
                </div>
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
                }
            </div>
        );
    }

    setDepartureDate(date) {
        let formattedDate = date.format("YYYY MM DD");
        store.dispatch(Actions.setDepartureDate(formattedDate));
    }

    setArrivalDate(date) {
        let formattedDate = date.format("YYYY MM DD");
        store.dispatch(Actions.setArrivalDate(formattedDate));
    }

    setAirportFrom(event) {
        let airportFrom = event.target.value;
        store.dispatch(Actions.setAirportFrom(airportFrom));
    }

    setAirportTo(event) {
        let airportTo = event.target.value;
        store.dispatch(Actions.setAirportTo(airportTo));
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
        }
    }
}

export const ConnectedFlights = ReactRedux.connect(
    (state) => ({
        flights: state.flights,
        airports: state.airports,
        searchDetails: state.searchDetails,
    })
)(Flights);
import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import * as $ from "jquery";
import * as ReactRedux from "react-redux";
import * as Actions from "../actions/actions";
import { Button, Panel } from "react-bootstrap";

import "../css/aha.css";
import { store } from "../index";

function getAirportsFromServlet() {
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
            url: "http://localhost:8080/AHAService/AirportServlet?action=getAirports",
        });
    });
}

class FlightsFilter extends React.Component {

    componentDidMount() {
        store.dispatch(Actions.setErrorMessage(""));
        getAirportsFromServlet().then((result) => {
            store.dispatch(Actions.loadAirports(result))
        }).catch((error) => {
            console.log(error);
        });
        store.dispatch(Actions.setDepartureDate(moment().format("YYYY-MM-DDThh:mmZ")));
        store.dispatch(Actions.setAirportFrom("Budapest"));
    }

    render() {
        return (
            <div className="form-group" id="flight-search">
                <div>
                    <Panel>
                        <div className="col-sm-3">
                            <label className="col-sm-12" >Departure: </label>
                            <DatePicker
                                dateFormat="DD/MM/YYYY"
                                todayButton={"Today"}
                                className="form-control"
                                selected={moment(this.props.searchDetails.departureDate, "YYYY-MM-DDThh:mmZ")}
                                onChange={this.setDepartureDate.bind(this)}
                                />
                        </div>
                        <div className="col-sm-3">
                            <label className="col-sm-12" >From: </label>
                            <select
                                className="form-control"
                                id="airport-from"
                                onChange={this.setAirportFrom.bind(this)}>
                                {this.props.airports.map((airport, index) => {
                                    return (
                                        <option key={index} >{airport.city}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="col-sm-3">
                            <label className="col-sm-12" >To: </label>
                            <select
                                className="form-control"
                                id="airport-to"
                                onChange={this.setAirportTo.bind(this)}>
                                {this.props.searchDetails.airportTo === "" &&
                                    <option
                                        key="selectDestination"
                                        value=""
                                        selected
                                        disabled
                                        >Select destination
                                    </option>
                                }
                                {this.props.airports
                                    /*.filter((airport1) => { return airport1.city !== document.getElementById("airport-from").value })*/
                                    .map((airport, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={airport.city}
                                                >{airport.city}
                                            </option>
                                        )
                                    })}
                            </select>
                        </div>
                        <div className="col-sm-3">
                            <Button bsStyle="primary"
                                onClick={this.handleFlightSearch.bind(this)}>Search AHA flights</Button>
                        </div>
                    </Panel>
                </div>
            </div>
        );
    }

    handleFlightSearch() {
        if (this.props.errorMessage === "") {
            if (document.getElementById("airport-to").value === "") {
                store.dispatch(Actions.setErrorMessage("Please select a destination airport"));
            } else {
                this.loadFlightsByFilterDetails(moment(this.props.searchDetails.departureDate, "YYYY-MM-DDThh:mmZ").format("YYYY-MM-DD"),
                    this.props.searchDetails.airportFrom, this.props.searchDetails.airportTo).then((result) => {
                        if (result.length > 0) {
                            let formattedFlights = this.formatFlights(result);
                            store.dispatch(Actions.updateFlights(formattedFlights));
                        } else {
                            store.dispatch(Actions.setErrorMessage("Sorry, AHA doesn't fly on "
                                + moment(this.props.searchDetails.departureDate, 'YYYY-MM-DDThh:mmZ').format('DD/MM/YYYY')
                                + " from " + this.props.searchDetails.airportFrom
                                + " to " + this.props.searchDetails.airportTo));
                        }
                    }).catch((err) => { 
                        store.dispatch(Actions.setErrorMessage("Server unavailable. Please check back later.")); 
                    });
            }
        }
    }

    formatFlights(flightsFromApi) {
        return flightsFromApi.map((flight) => {
            return (
                Object.assign({}, flight, {
                    departure: moment(flight.departure, "YYYY-MM-DDThh:mmZ").format("DD/MM/YYYY hh:mm"),
                    display: false,
                })
            )
        });
    }

    loadFlightsByFilterDetails(departure, airportFrom, airportTo) {
        let startSearchDay = moment(departure, "YYYY-MM-DDThh:mmZ").format("YYYY-MM-DD");
        let endSearchDay = moment(departure, "YYYY-MM-DDThh:mmZ").add(2, "d").format("YYYY-MM-DD");
        return new Promise((resolve, reject) => {
            $.ajax({
                cache: false,
                dataType: "json",
                error: function (xhr, status, err) {
                    console.log(xhr.status);
                    console.log(this.url);
                    reject(xhr.status);
                }.bind(this),
                success: function (data) {
                    resolve(data);
                }.bind(this),
                url: "http://localhost:8080/AHAService/FlightServlet?action=getFilteredFlights&from="
                + airportFrom
                + "&to=" + airportTo
                + "&start=" + startSearchDay
                + "&end= " + endSearchDay,
            });
        });
    }

    setDepartureDate(date) {
        this.validateFilterOptions();
        let formattedDate = date.format("YYYY-MM-DDThh:mmZ");
        if (date < moment()) {
            store.dispatch(Actions.setDepartureDate(moment()));
            store.dispatch(Actions.setErrorMessage("Past dates cannot be chosen. Please select a valid date."));
        } else {
            store.dispatch(Actions.setDepartureDate(formattedDate));
        }
    }

    setAirportFrom(event) {
        this.validateFilterOptions();
        let airportFrom = event.target.value;
        store.dispatch(Actions.setAirportFrom(airportFrom));
    }

    setAirportTo(event) {
        this.validateFilterOptions();
        let airportTo = event.target.value;
        store.dispatch(Actions.setAirportTo(airportTo));
    }

    validateFilterOptions() {
        let errorMessage = "";
        let airportFrom = document.getElementById("airport-from").value;
        let airportTo = document.getElementById("airport-to").value;
        if (airportFrom === airportTo) {
            errorMessage += "Sorry, we don't fly from " + airportFrom + " to " + airportTo + ".";
        }
        store.dispatch(Actions.setErrorMessage(errorMessage));
    }

}

export const ConnectedFlightsFilter = ReactRedux.connect(
    (state) => ({
        airports: state.airports,
        errorMessage: state.errorMessage,
        searchDetails: state.searchDetails,
    })
)(FlightsFilter);
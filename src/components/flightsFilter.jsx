import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import * as $ from "jquery";
import "react-datepicker/dist/react-datepicker.css";
import * as ReactRedux from "react-redux";
import * as Actions from "../actions/actions";

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
        store.dispatch(Actions.setDepartureDate(moment().format("YYYY MM DD")));
        store.dispatch(Actions.setArrivalDate(moment().format("YYYY MM DD")));
        store.dispatch(Actions.setAirportFrom("Budapest"));
        // store.dispatch(Actions.setAirportTo("Budapest"));
    }

    render() {
        let startDate = moment();
        return (
            <div className="form-group row" id="flight-search">
                <div>
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
                    <div className="col-sm-3">
                        <label className="col-sm-12" >From: </label>
                        <select
                            className="form-control"
                            id="airport-from"
                            onChange={this.setAirportFrom.bind(this) }>
                            {this.props.airports.map((airport, index) => {
                                return (
                                    <option key={index} >{airport.city}</option>
                                )
                            }) }
                        </select>
                    </div>
                    <div className="col-sm-3">
                        <label className="col-sm-12" >To: </label>

                        <select
                            className="form-control"
                            id="airport-to"
                            onChange={this.setAirportTo.bind(this) }>
                            {this.props.searchDetails.airportTo === "" &&
                                <option
                                    key="selectDestination"
                                    value = ""
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
                                            value ={airport.city}
                                            >{airport.city}
                                        </option>
                                    )
                                }) }
                        </select>
                    </div>
                </div>
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
        this.validateFilterOptions();
        let airportFrom = event.target.value;
        store.dispatch(Actions.setAirportFrom(airportFrom));
    }

    setAirportTo(event) {
        // store.dispatch(Actions.setErrorMessage(""));
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
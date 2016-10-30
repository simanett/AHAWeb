import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import * as $ from "jquery";
import "react-datepicker/dist/react-datepicker.css";

// import { Table } from 'react-bootstrap';
import * as ReactRedux from "react-redux";

import * as Actions from "../actions/actions";

import { store } from "../index";

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

class FlightsFilter extends React.Component {
    
    componentDidMount() {
        getAirportsFromServlet().then((result) => {
            store.dispatch(Actions.loadAirports(result))
        });
        store.dispatch(Actions.setDepartureDate(moment().format("YYYY MM DD")));
        store.dispatch(Actions.setArrivalDate(moment().format("YYYY MM DD")));
        store.dispatch(Actions.setAirportFrom("Budapest"));
        store.dispatch(Actions.setAirportTo("Budapest"));
    }

    render() {
        let startDate = moment();
        return (
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

}

export const ConnectedFlightsFilter = ReactRedux.connect(
    (state) => ({
        airports: state.airports,
        searchDetails: state.searchDetails,
    })
)(FlightsFilter);
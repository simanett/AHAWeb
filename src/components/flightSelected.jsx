import React from "react";
import * as ReactRedux from "react-redux";
import moment from "moment";
import { Button, Panel } from "react-bootstrap";

import * as Actions from "../actions/actions";
import { store } from "../index";

class FlightSelected extends React.Component {
    render() {
        return (
            <div className="selected-flight-details well">
                <div>
                <Panel  header="Your selected flight">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>From</th>
                                <th>To</th>
                                <th>Leaving on</th>
                                <th>Arriving at</th>
                                <th>Flight duration (min)</th>
                                
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="info">
                                <td>{this.props.chosenFlight.airportFrom}</td>
                                <td>{this.props.chosenFlight.airportTo}</td>
                                <td>{this.props.chosenFlight.departure}</td>
                                <td>{moment(this.props.chosenFlight.departure, "DD/MM/YYYY hh:mm").add(this.props.chosenFlight.flightDuration, "m").format("DD/MM/YYYY hh:mm")}</td>
                                <td>{this.props.chosenFlight.flightDuration}</td>
                                <td>{this.props.chosenFlight.basicPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                
                <Button bsStyle="primary"
                    onClick={this.handleBookSeat.bind(this) }>Book your seat</Button>
                    </Panel>
                    </div>
            </div>
        );
    }

    handleBookSeat() {
        store.dispatch(Actions.seatBookingRequested(true));
    }
}

export const ConnectedFlightSelected = ReactRedux.connect(
    (state) => ({
        flights: state.flights,
        chosenFlight: state.chosenFlight,
    })
)(FlightSelected);

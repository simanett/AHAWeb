import React from "react";
import * as ReactRedux from "react-redux";
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
                                <th>Leaving on</th>
                                <th>Arriving at</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="info">
                                <td>{this.props.chosenFlight.departure}</td>
                                <td>{this.props.chosenFlight.arrival}</td>
                                <td>{this.props.chosenFlight.airportFrom}</td>
                                <td>{this.props.chosenFlight.airportTo}</td>
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

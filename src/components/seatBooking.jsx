import React from "react";
import * as ReactRedux from "react-redux";

class SeatBooking extends React.Component {
    render() {
        return (
            <div id="seat-booking">
                <h3>Book your seat</h3>
            </div>
        );
    }
}

export const ConnectedSeatBooking = ReactRedux.connect(
    (state) => ({
        chosenFlight: state.chosenFlight,
    })
)(SeatBooking);
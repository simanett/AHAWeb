import React from "react";
import * as $ from "jquery";
import * as ReactRedux from "react-redux";
import * as Actions from "../actions/actions";
import { Button, Modal } from "react-bootstrap";

import ahaStyle from '../css/aha.css';

class SeatBooking extends React.Component {

    constructor(props) {
        super(props);
        this.handleSeatChanged = this.handleSeatChanged.bind(this);
        this.handleBookSeatClick = this.handleBookSeatClick.bind(this);
        this.close = this.close.bind(this);
    }

    handleSeatChanged(e) {
        this.props.dispatch(Actions.seatChanged(parseInt(e.target.value)));
    }

    seatRadio(seat) {
        
        return <input type="radio" 
                    name="seat" 
                    value={seat.id}
                    checked={seat.id === this.props.selectedSeat} 
                    onChange={this.handleSeatChanged}>
                </input>;
    }

    close() {
        if (this.props.response.isError) {
            this.props.dispatch(Actions.resetBooking());
        } else {
            this.props.dispatch(Actions.resetSelection());
        }
    }

    seatRow(seats) {
        return seats.map(seat => {
            return (<td className={ahaStyle.seat}>{this.seatRadio(seat)}</td>);
        });
    }

    seatSelectForm() {
        var seats = this.props.chosenAirplaneType.seats,
            rows = [], i;

        for(i = 0; i < seats.length; i += 6) {
            rows.push(<tr>
                <td>{seats[i].row}</td>
                { this.seatRow(seats.slice(i, i + 6)) }
            </tr>);
        }

        return rows;
    }

    seatDetail(label, value) {
        return <div className="form-group row">
                    <label htmlFor="example-text-input" className="col-xs-4 col-form-label">{label}</label>
                    <div className="col-xs-8">
                        {value}
                    </div>
            </div>; 
    }

    handleBookSeatClick() {
        var seatId = this.props.selectedSeat,
            flight = this.props.chosenFlight.id,
            self = this;
        if(seatId >=0) {
            this.props.dispatch(Actions.createBookingRequest());
            return $.ajax({
                cache: false,
                dataType: "json",
                method: 'POST',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('x-auth', this.props.token);
                }.bind(this),
                url: "http://localhost:8080/AHAService/BookingServlet",
                data: { 
                    action: 'createBooking',
                    flight: flight, 
                    seat: seatId
                }
            })
            .done(function(data) {
                self.props.dispatch(Actions.createBookingResponse(data, false));
            })
            .fail(function (xhr, status, err) {
                self.props.dispatch(Actions.createBookingResponse(err, true));
            });            
        }

    }



    render() {
        var flight = this.props.chosenFlight,
            seat = this.props.chosenAirplaneType.seats.find(s => {
                    return s.id === this.props.selectedSeat
                }),
            seatText = seat ? seat.row + seat.letter: 'n.a',
            price = seat ? 
                parseInt(this.props.chosenFlight.basicPrice) * (1 + seat.multiplier) :
                'n.a';

        return (
            <div id="seat-booking">
                <h3>Book your seat</h3>

                <div className='col-xs-12 col-sm-4'>

                    <table className="table seat-table">
                        <thead>
                        <tr>
                            <th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th>
                        </tr>
                        </thead>
                        <tbody>
                            { this.seatSelectForm() }
                        </tbody>
                    </table>
                </div>
                <div className='col-xs-12 col-sm-8'> 
                    {this.seatDetail('Flight number', flight.flightNumber)}
                    {this.seatDetail('Departure', flight.departure)}
                    {this.seatDetail('From', flight.airportFrom)}
                    {this.seatDetail('To', flight.airportFrom)}
                    {this.seatDetail('Selected seat', seatText)}
                    {this.seatDetail('Price', price)}

                    <div>
                        <Button disabled={!seat || this.props.sendingRequest}
                                className='btn btn-primary btn-block'
                                onClick={this.handleBookSeatClick}>
                            {this.props.sendingRequest ? 'Booking request...' : 'Book seat'}
                        </Button>
                    </div>
                </div>

                <Modal show={this.props.response} onHide={this.close}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                    {
                        this.props.isError ? 'Error': 'Success'
                    }
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{
                    this.props.isError ? (
                            <span>{this.props.response.message}</span>
                        ) : (
                            <div>
                                Ticket booked successfully.<br/>
                                Your booking reference is <strong>{this.props.response && this.props.response.bookingReference}</strong>
                            </div>
                        )
                    }
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                  </Modal.Footer>
                </Modal>


            </div>
        );
    }
}


export const ConnectedSeatBooking = ReactRedux.connect(
    (state) => ({
        chosenFlight: state.chosenFlight,
        chosenAirplaneType: state.chosenAirplaneType,
        errorMessage: state.errorMessage,
        passengerDetails: state.passengerDetails,
        selectedSeat: state.saveBookingRequested.selectedSeat,
        sendingRequest: state.saveBookingRequested.sendingRequest,
        response: state.saveBookingRequested.response,
        isError: state.saveBookingRequested.isError,
        token: state.auth.token
    })
)(SeatBooking);
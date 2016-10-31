import React from "react";
import * as ReactRedux from "react-redux";
import * as $ from "jquery";

import { store } from "../index";
import * as Actions from "../actions/actions";
import { Alert } from "react-bootstrap";

class ErrorMessage extends React.Component {

    componentDidMount() {
        this.clearErrorsOnEscButtonPress();
    }

    render() {
        return (
            <div id="error-message-outer" className="col-sm-12 warning">
                <div id="error-message-inner"
                    className="col-sm-12 bordered"
                    title="Click or hit escape to dismiss this message."
                    onClick={this.errorMsgDismiss.bind(this) } >
                    <Alert bsStyle="warning" onDismiss={this.errorMsgDismiss.bind(this)}>
                        <span className="">{ this.props.errorMessage }</span>
                    </Alert>
                </div>
            </div>
        );
    }

    errorMsgDismiss() {
        store.dispatch(Actions.setErrorMessage(""));
    }

    clearErrorsOnEscButtonPress() {
        if (this.props.error !== "") {
            $(document).on("keyup", function (evt) {
                if (evt.keyCode === 27) {
                    store.dispatch(Actions.setErrorMessage(""));
                }
            });
        }
    }
}

export const ConnectedErrorMessage = ReactRedux.connect(
    (state) => ({
        errorMessage: state.errorMessage,
    })
)(ErrorMessage);
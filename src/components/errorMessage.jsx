import React from 'react';

class ErrorMessage extends React.Component {

    componentDidMount() {
        this.clearErrorsOnEscButtonPress();
    }

    render() {
        return (
            <div id="error-message-outer" className="col-sm-12">
                <div id="error-message-inner"
                    className="col-sm-12 bordered"
                    title="Click or hit escape to dismiss this message."
                    onClick={this.errorMsgDismiss.bind(this) } >
                    <span className="">{ this.props.error }</span>
                </div>
            </div>
        );
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
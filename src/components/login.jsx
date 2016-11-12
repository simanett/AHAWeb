import React from "react";
import * as ReactRedux from "react-redux";
import GoogleLogin from 'react-google-login';
import * as Actions from "../actions/actions";

import ahaStyleLogin from '../css/login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    responseGoogle(response) {
        console.log('Response from Google', response);
        //window.authorization = response.tokenId;
        this.props.dispatch(Actions.saveAuthToken(response.tokenId, response.profileObj));
    }

    render() {
        console.log('Login props', this.props);

        if (!this.userLoggedIn()) {
            return (
                <div>
                    <h2>You have to sign in to use the application</h2>
                    <div className="login">
                        <GoogleLogin
                            clientId="125709493721-b5lt98bnffgpgun9dluio0c0eg7t4rvk.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle} />

                    </div>
                </div>
            );
        }

        return <div>
            <h2>Logged in as</h2>
            <div className="row col-sm-12">
                <div className="col-sm-2">
                    <img src={this.props.profile.imageUrl} />
                </div>
                <div className="form-group row col-sm-4">
                    <h3>{this.props.profile.name}</h3>
                    {this.props.profile.email}
                </div>  
            </div>
        </div>
    }

    userLoggedIn() {
        return this.props.token;
    }
}


export const ConnectedLogin = ReactRedux.connect(
    (state) => ({
        token: state.auth.token,
        profile: state.auth.profile,
    })
)(Login);
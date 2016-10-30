import React from "react";
import * as ReactRedux from "react-redux";

import ahaStyleLogin from '../css/login.css';

class Login extends React.Component {
    render() {
        if (userLoggedIn()) {
            return (
                <div className="login">
                    <form className={ahaStyleLogin.formSignin}>
                        <h2 className="form-signin-heading">Please sign in</h2>
                        <label className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" />
                        <label className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    </form>
                </div>
            );
        }
    }
}

function userLoggedIn() {
    return true;
}

export const ConnectedLogin = ReactRedux.connect(
    (state) => ({
        flights: state.flights,
    })
)(Login);
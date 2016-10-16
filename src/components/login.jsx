import React from "react";

export default class Login extends React.Component {
    render() {
        if (userLoggedIn()) {
            return (
                <div className="login">
                    <form className="form-signin">
                        <h2 className="form-signin-heading">Please sign in</h2>
                        <label for="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autofocus="" />
                        <label for="inputPassword" className="sr-only">Password</label>
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

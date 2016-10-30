import React from 'react';
import * as ReactRedux from 'react-redux';
import './css/aha.css';
import './css/login.css';
import Navbar from './components/navbar';
import Login from './components/login';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    )
  }
}

export const ConnectedApp = ReactRedux.connect(
  (state) => (state)
)(App);

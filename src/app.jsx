import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from './css/aha.css';
// import ahaStyle from '../css/aha.css';
import './css/aha.css';
import './css/login.css';
import Navbar from './components/navbar';
import Login from './components/login';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    )
  }
}
import React, { Component } from 'react';
import { contact } from '../../data.json';

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact,
    };
  }

  render() {
    return (
      <div className="component-container">
        <div className="component-title">Contact</div>
        <div className="component-content">Email: {this.state.contact.email}</div>
      </div>
    );
  }
}
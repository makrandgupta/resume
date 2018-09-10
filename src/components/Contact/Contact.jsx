import React, { Component } from 'react';
import { contact } from '../../data.json';
import './Contact.css';

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
        <div className="component-content flex horizontal wrap space-evenly">

          {
            this.state.contact.map((contact, i) => (
              <div className="contact-container" key={i}>
                <div className="contact-header">{contact.type}</div>
                <div className="contact-data">{contact.value}</div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
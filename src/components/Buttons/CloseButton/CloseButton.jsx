import React, { Component } from 'react';
import './CloseButton.css';

export default class CloseButton extends Component {
  render() {
    return (
      <div className="closeButton-container" onClick={this.props.onClick}>
        Close
      </div>
    );
  }
}
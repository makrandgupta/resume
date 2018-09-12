import React, { Component } from 'react';
import './AddButton.css';

export default class AddButton extends Component {
  render() {
    return (
      <div className="addButton-container" onClick={this.props.onClick}>
        Add
      </div>
    );
  }
}
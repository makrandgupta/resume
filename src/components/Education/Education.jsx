import React, { Component } from 'react';
import { education } from '../../data.json';

export default class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      education,
    };
  }

  render() {
    return (
      <div className="component-container">
        <div className="component-title">Education</div>
        <div className="component-content">
          <div>{this.state.education[0].school}</div>
          <div>{this.state.education[0].degree}</div>
          <div>{this.state.education[0].field}</div>
          <div>{this.state.education[0].location.city}, {this.state.education[0].location.country}</div>
        </div>
      </div>
    );
  }
}
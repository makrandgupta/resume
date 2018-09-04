import React, { Component } from 'react';
import { experience } from '../../data.json';

export default class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experience,
    };
  }

  render() {
    return (
      <div className="component-container">
        <div className="component-title">Experience</div>
        <div className="component-content">
          {
            this.state.experience.map((xp, i) => (
              <div key={i}>
                <div>{xp.title}</div>
                <div>{xp.company}</div>
                <div>{xp.location.city}, {xp.location.country}</div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
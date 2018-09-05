import React, { Component } from 'react';
import { experience } from '../../data.json';
import './Experience.css';

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
              <div className="experience-container" key={i}>
                <div className="experience-title">{xp.title}</div>
                <div className="experience-company">{xp.company}</div>
                <div className="experience-location">{xp.location.city}, {xp.location.country}</div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
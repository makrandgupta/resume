import React, { Component } from 'react';
import { skills } from '../../data.json';

export default class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills,
    };
  }

  render() {
    return (
      <div className="component-container">
        <div className="component-title">Skills</div>
        <div className="component-content">{this.state.skills.reduce((skill, all) => `${all}, ${skill}`) }</div>
      </div>
    );
  }
}
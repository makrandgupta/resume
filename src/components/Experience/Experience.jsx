import _ from 'lodash';

import React from 'react';
import './Experience.css';

import base from '../../services/base';

export default class Experience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experiences: {},
    };
  }

  componentDidMount() {
    this.ref = base.syncState('experiences', {
      context: this,
      state: 'experiences'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  renderExperience = (key) => {
    const experience = this.state.experiences[key];

    return (
      <div className="experience-container" key={key}>
        <div className="experience-metadata">
          <div className="experience-company">{experience.company}</div>
          <div className="experience-location">{experience.location.city}, {experience.location.country}</div>
        </div>
        <div className="experience-data">
          <div className="experience-title">{experience.title}</div>
          <div className="experience-description" dangerouslySetInnerHTML={{ __html: experience.description }} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="component-container">
        <div className="component-title">Experience</div>
        <div className="component-content">
          {_.keys(this.state.experiences).map(this.renderExperience)}
          <div className="experience-clear"></div>
        </div>
      </div>
    );
  }
}
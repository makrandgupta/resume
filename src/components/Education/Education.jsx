import _ from 'lodash';

import React from 'react';

import base from '../../services/base';

export default class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      educations: {},
    };
  }

  componentDidMount() {
    this.ref = base.syncState('educations', {
      context: this,
      state: 'educations'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  renderEducation = (key) => {
    const { educations } = this.state;

    return (
      <div className="contact-container" key={key}>
        <div className="contact-header">{educations[key].type}</div>
        <div className="contact-data">
          <div>{educations[key].school}</div>
          <div>{educations[key].degree}</div>
          <div>{educations[key].field}</div>
          <div>{educations[key].location.city}, {educations[key].location.country}</div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="component-container">
        <div className="component-title">Education</div>
        <div className="component-content">
          {_.keys(this.state.educations).map(this.renderEducation)}
        </div>
      </div>
    );
  }
}
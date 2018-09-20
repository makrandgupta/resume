import _ from 'lodash';
import React from 'react';

import base from '../../services/base';

export default class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: {},
    };
  }

  componentDidMount() {
    this.ref = base.syncState('skills', {
      context: this,
      state: 'skills'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  renderSkill = (key) => {
    const skill = this.state.skills[key];

    return (
      <li key={key}>{skill.name}</li>
    )
  }
  render() {
    return (
      <div className="component-container">
        <div className="component-title">Skills</div>
        <div className="component-content">
          <ul>
            {_.keys(this.state.skills).map(this.renderSkill)}
          </ul>
        </div>
      </div>
    );
  }
}
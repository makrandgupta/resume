import _ from 'lodash';

import React from 'react';

import AddButton from '../Buttons/AddButton/AddButton';
import AddEducationForm from '../AddEducationForm';

import base from '../../services/base';

export default class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddEducationForm: false,
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

  addEducation = (education) => {
    const educations = this.state.educations;
    console.log('got edu', education);
    educations[`edu${Date.now()}`] = education;
    this.setState({ educations });
  };

  // START: Display AddEducationForm handlers

  handleOpenAddEducationForm = () => {
    this.setState({
      showAddEducationForm: true
    });
  }

  handleCloseAddEducationForm = () => {
    this.setState({
      showAddEducationForm: false
    });
  }

  // END: Display AddEducationForm handlers

  renderEducation = (key) => {
    const { educations } = this.state;

    return (
      <div className="contact-container" key={key}>
        <div className="contact-header">{_.get(educations, `${key}.type`)}</div>
        <div className="contact-data">
          <div>{_.get(educations, `${key}.school`)}</div>
          <div>{_.get(educations, `${key}.degree`)}</div>
          <div>{_.get(educations, `${key}.field`)}</div>
          <div>{_.get(educations, `${key}.location.city`)}, {_.get(educations, `${key}.location.country`)}</div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="component-container">
        <div className="component-title">
          Education
          <AddButton onClick={this.handleOpenAddEducationForm} />
        </div>
        {this.state.showAddEducationForm && <AddEducationForm addEducation={this.addEducation} />}
        <div className="component-content">
          {_.keys(this.state.educations).map(this.renderEducation)}
        </div>
      </div>
    );
  }
}
import _ from 'lodash';

import React from 'react';

import SectionHeader from '../SectionHeader';

import AddEducationForm from '../AddEducationForm';

import base from '../../services/base';
import { Container, Segment, Header } from 'semantic-ui-react';

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
      <Segment key={key}>
        <Header as="h3" textAlign="left">
          {_.get(educations, `${key}.field`)}
          <Header.Subheader>
            {_.get(educations, `${key}.location.city`)}, {_.get(educations, `${key}.location.country`)}
          </Header.Subheader>
        </Header>
        <div>{_.get(educations, `${key}.degree`)}</div>
        <div>{_.get(educations, `${key}.school`)}</div>
      </Segment>
    )
  }

  render() {
    return (
      <Container>
        <SectionHeader
          sectionName="Education"
          openAddForm={this.handleOpenAddEducationForm}
          closeAddForm={this.handleCloseAddEducationForm}
        />
        {this.state.showAddEducationForm && <AddEducationForm addEducation={this.addEducation} />}
        <Segment.Group>
          {_.keys(this.state.educations).map(this.renderEducation)}
        </Segment.Group>
      </Container>
    );
  }
}
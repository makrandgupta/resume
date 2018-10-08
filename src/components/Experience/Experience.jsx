import _ from 'lodash';

import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';

import AddButton from '../Buttons/AddButton/AddButton';
import AddExperienceForm from '../AddExperienceForm';

import base from '../../services/base';

class Experience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddExperienceForm: false,
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
      <div>
        <Header as="h3" attached="top" textAlign="left">
          {experience.title} - {experience.company}
          <Header.Subheader>{experience.location.city}, {experience.location.country}</Header.Subheader>
        </Header>
        <Segment attached>
          <div dangerouslySetInnerHTML={{ __html: experience.description }} />
        </Segment>
      </div>
    )
  }

  render() {
    return (

      <Container>
        <Header as="h2" textAlign="left">
          Experience
          <AddButton onClick={this.handleOpenAddExperienceForm} />
        </Header>
        {this.state.showAddExperienceForm && <AddExperienceForm addExperience={this.addExperience} />}
        <Segment.Group vertical>
          {/* TODO: dynamically switch to vertical segment group based on content + screen size */}
          {_.keys(this.state.experiences).map(this.renderExperience)}
        </Segment.Group>

      </Container>
    );
  }
}

export default Experience;

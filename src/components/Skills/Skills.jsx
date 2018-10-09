import _ from 'lodash';
import React from 'react';
import { Container, Header, List, Segment } from 'semantic-ui-react';
import SectionHeader from '../SectionHeader';

import AddSkillForm from '../AddSkillForm';

import base from '../../services/base';


class Skills extends React.Component {
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
      <List.Item key={key}>{skill.name}</List.Item>
    )
  }
  render() {
    return (
      <Container>
         <SectionHeader
          sectionName="Skills"
          openAddForm={this.handleOpenAddSkillForm}
          closeAddForm={this.handleCloseAddSkillForm}
        />
        {this.state.showAddSkillForm && <AddSkillForm addSkill={this.addSkill} />}
        <Segment>
          <List>
            {_.keys(this.state.skills).map(this.renderSkill)}
          </List>
        </Segment>
      </Container>
    );
  }
}

export default Skills;

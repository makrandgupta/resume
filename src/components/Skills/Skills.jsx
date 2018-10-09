import _ from 'lodash';
import React from 'react';
import { Container, List, Segment } from 'semantic-ui-react';
import SectionHeader from '../SectionHeader';

import AddSkillForm from '../AddSkillForm';

import base from '../../services/base';


class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddSkillForm: false,
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

  addSkill = (skill) => {
    const skills = this.state.skills;
    skills[`skill${Date.now()}`] = skill;
    this.setState({ skills });
  };

  // START: Display AddSkillForm handlers

  handleOpenAddSkillForm = () => {
    this.setState({
      showAddSkillForm: true
    });
  }

  handleCloseAddSkillForm = () => {
    this.setState({
      showAddSkillForm: false
    });
  }

  // END: Display AddSkillForm handlers

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

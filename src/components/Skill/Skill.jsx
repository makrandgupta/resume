import _ from 'lodash';
import React from 'react';
import { Container, List, Segment } from 'semantic-ui-react';
import base from '../../services/base';
import { AuthContext } from '../Auth/AuthContext';
import EditButton from '../Buttons/EditButton';
import EditModal from '../EditModal';
import SectionHeader from '../SectionHeader';
import SkillForm from './SkillForm';

class Skill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddSkillForm: false,
      showEditSkillModal: false,
      skills: {},
      uid: '',
    };
  }

  componentDidMount() {
    this.ref = base.syncState(`${this.state.uid}/skills`, {
      context: this,
      state: 'skills'
    });
  }

  componentDidUpdate() {
    if (this.state.uid !== this.context.uid) {
      this.setState({
        uid: this.context.uid
      });
      base.removeBinding(this.ref);
      this.ref = base.syncState(`${this.context.uid}/skills`, {
        context: this,
        state: 'skills'
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  handleAddSkill = (skill) => {
    const skills = this.state.skills;
    skills[`skill${Date.now()}`] = skill;
    this.setState({ skills });
  };

  handleSaveSkill = (skill) => {
    const skills = { ...this.state.skills };
    skills[skill.key] = _.pickBy(skill, (value, key) => key !== 'key');
    this.setState({ skills });
  }

  handleDeleteSkill = (skillKey) => {
    const skills = { ...this.state.skills };
    skills[skillKey] = null;
    this.setState({ skills });
  }

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

  handleOpenEditSkill = (skillKey) => {
    this.setState({
      showEditSkillModal: true,
      skillToEdit: {
        key: skillKey,
        ...(this.state.skills[skillKey])
      }
    })
  }

  handleCloseEditSkill = () => {
    this.setState({
      showEditSkillModal: false
    })
  }

  // END: Display AddSkillForm handlers

  renderSkill = (key) => {
    const skill = this.state.skills[key];

    return (
      <List.Item key={key}>
        <EditButton onClick={() => this.handleOpenEditSkill(key)} />
        {skill.name}
      </List.Item>
    )
  }
  render() {
    return (
      <Container>
        <SectionHeader
          sectionName="Skill"
          openAddForm={this.handleOpenAddSkillForm}
          closeAddForm={this.handleCloseAddSkillForm}
          isFormOpen={this.state.showAddSkillForm}
        />
        {this.state.showAddSkillForm && <SkillForm onAdd={this.handleAddSkill} />}
        <Segment>
          <List>
            {_.keys(this.state.skills).map(this.renderSkill)}
          </List>
        </Segment>

        <EditModal
          section="skill"
          data={this.state.skillToEdit}
          open={this.state.showEditSkillModal}
          onClose={this.handleCloseEditSkill}
          onDelete={this.handleDeleteSkill}
          onSave={this.handleSaveSkill}
        />
      </Container>
    );
  }
}

Skill.contextType = AuthContext;

export default Skill;

import _ from 'lodash';
import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import base from '../../services/base';
import EditButton from '../Buttons/EditButton';
import EditModal from '../EditModal';
import ExperienceForm from './ExperienceForm';
import SectionHeader from '../SectionHeader';
import { AuthContext } from '../Auth/AuthContext';

class Experience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experienceToEdit: {},
      experiences: {},
      showAddExperienceForm: false,
      showEditExperienceModal: false,
      uid: '',
    };
  }

  componentDidMount() {
    this.ref = base.syncState(`${this.state.uid}/experiences`, {
      context: this,
      state: 'experiences'
    });
  }

  componentDidUpdate() {
    if (this.state.uid !== this.context.uid) {
      this.setState({
        uid: this.context.uid
      });
      base.removeBinding(this.ref);
      this.ref = base.syncState(`${this.context.uid}/experiences`, {
        context: this,
        state: 'experiences'
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  handleAddExperience = (experience) => {
    const experiences = this.state.experiences;
    experiences[`exp${Date.now()}`] = experience;
    this.setState({ experiences });
  };

  handleSaveExperience = (experience) => {
    const experiences = { ...this.state.experiences };
    experiences[experience.key] = _.pickBy(experience, (value, key) => key !== 'key');
    this.setState({ experiences });
  }

  handleDeleteExperience = (experienceKey) => {
    const experiences = { ...this.state.experiences };
    experiences[experienceKey] = null;
    this.setState({ experiences });
  }

  // START: Display ExperienceForm handlers

  handleOpenAddExperienceForm = () => {
    this.setState({
      showAddExperienceForm: true
    });
  }

  handleCloseAddExperienceForm = () => {
    this.setState({
      showAddExperienceForm: false
    });
  }

  handleOpenEditExperience = (experienceKey) => {
    this.setState({
      showEditExperienceModal: true,
      experienceToEdit: {
        key: experienceKey,
        ...(this.state.experiences[experienceKey])
      }
    })
  }

  handleCloseEditExperience = () => {
    this.setState({
      showEditExperienceModal: false
    })
  }

  // END: Display ExperienceForm handlers

  renderExperience = (key) => {
    const experience = this.state.experiences[key];

    return (
      <Segment key={key}>
        <Header as="h3" textAlign="left">
          {experience.title} - {experience.company}
          <Header.Subheader>{experience.city}, {experience.country}</Header.Subheader>
          <EditButton onClick={() => this.handleOpenEditExperience(key)} />
        </Header>
        <div dangerouslySetInnerHTML={{ __html: experience.description }} />
      </Segment>
    )
  }

  render() {
    return (

      <Container>
        <SectionHeader
          sectionName="Experience"
          openAddForm={this.handleOpenAddExperienceForm}
          closeAddForm={this.handleCloseAddExperienceForm}
          isFormOpen={this.state.showAddExperienceForm}
        />
        {this.state.showAddExperienceForm && <ExperienceForm onAdd={this.handleAddExperience} />}
        <Segment.Group>
          {/* TODO: dynamically switch to vertical segment group based on content + screen size */}
          {_.keys(this.state.experiences).map(this.renderExperience)}
        </Segment.Group>

        <EditModal
          section="experience"
          data={this.state.experienceToEdit}
          open={this.state.showEditExperienceModal}
          onClose={this.handleCloseEditExperience}
          onDelete={this.handleDeleteExperience}
          onSave={this.handleSaveExperience}
        />
      </Container>
    );
  }
}

Experience.contextType = AuthContext;

export default Experience;

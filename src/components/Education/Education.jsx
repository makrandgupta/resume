import _ from 'lodash';
import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import base from '../../services/base';
import EditButton from '../Buttons/EditButton';
import EditModal from '../EditModal';
import EducationForm from './EducationForm';
import SectionHeader from '../SectionHeader';

export default class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddEducationForm: false,
      showEditEducationModal: false,
      educationToEdit: {},
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

  handleAddEducation = (education) => {
    const educations = this.state.educations;
    educations[`edu${Date.now()}`] = education;
    this.setState({ educations });
    this.handleCloseAddEducationForm();
  };

  handleSaveEducation = (education) => {
    const educations = { ...this.state.educations };
    educations[education.key] = _.pickBy(education, (value, key) => key !== 'key');
    this.setState({ educations });
  }

  handleDeleteEducation = (educationKey) => {
    const educations = { ...this.state.educations };
    educations[educationKey] = null;
    this.setState({ educations });
  }

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

  handleOpenEditEducation = (educationKey) => {
    this.setState({
      showEditEducationModal: true,
      educationToEdit: {
        key: educationKey,
        ...(this.state.educations[educationKey])
      }
    })
  }

  handleCloseEditEducation = () => {
    this.setState({
      showEditEducationModal: false
    })
  }

  // END: Display AddEducationForm handlers

  renderEducation = (key) => {
    const { educations } = this.state;

    return (
      <Segment key={key}>
        <Header as="h3" textAlign="left">
          {_.get(educations, `${key}.field`)}
          <Header.Subheader>
            {_.get(educations, `${key}.city`)}, {_.get(educations, `${key}.country`)}
          </Header.Subheader>
          <EditButton onClick={() => this.handleOpenEditEducation(key)} />
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
          isFormOpen={this.state.showAddEducationForm}
        />
        {this.state.showAddEducationForm && <EducationForm onAdd={this.handleAddEducation} />}
        <Segment.Group>
          {_.keys(this.state.educations).map(this.renderEducation)}
        </Segment.Group>

        <EditModal
          section="education"
          data={this.state.educationToEdit}
          open={this.state.showEditEducationModal}
          onClose={this.handleCloseEditEducation}
          onDelete={this.handleDeleteEducation}
          onSave={this.handleSaveEducation}
        />
      </Container>
    );
  }
}
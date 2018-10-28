import _ from 'lodash';
import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import ContactForm from './Contact/ContactForm';
import EducationForm from './Education/EducationForm';
import ExperienceForm from './Experience/ExperienceForm';
import NameForm from './Name/NameForm';
import SkillForm from './Skill/SkillForm';

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...(_.get(this.props, 'data')) };
  }

  forms = {
    name: NameForm,
    contact: ContactForm,
    experience: ExperienceForm,
    skill: SkillForm,
    education: EducationForm,
  }

  handleSave = () => {
    this.props.onSave(_.assign({}, this.props.data, _.pickBy(this.state)));
    this.props.onClose();
  }

  handleDelete = () => {
    this.props.onDelete(_.get(this.props, 'data.key'));
    this.props.onClose();
  }

  handleFormChange = (event, data) => {
    const src = _.isEmpty(data) ? event.target : data;
    // Checkbox component uses 'checked' instead of 'value' to store the current state
    src.value = _.get(src, 'type') === 'checkbox' ? src.checked : src.value;
    this.setState({
      [src.name]: src.value
    });
  }

  render() {
    const EditForm = this.forms[this.props.section];
    return (
      <Modal basic closeIcon open={this.props.open} onClose={this.props.onClose}>
        <Modal.Header>Edit {this.props.section}</Modal.Header>
        <Modal.Content>
          <EditForm data={this.props.data} onChange={this.handleFormChange} />
        </Modal.Content>
        <Modal.Actions>
          <Button basic inverted onClick={this.props.onClose}>
            Cancel
          </Button>
          {this.props.onDelete &&
            <Button
              negative
              basic
              inverted
              icon='delete'
              labelPosition='left'
              content="Delete"
              onClick={this.handleDelete}
            />
          }
          <Button
            positive
            basic
            icon='save'
            labelPosition='right'
            content="Save"
            onClick={this.handleSave}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default EditModal;
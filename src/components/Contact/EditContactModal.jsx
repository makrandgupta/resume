import _ from 'lodash';
import React from 'react';
import EditModal from '../EditModal';
import ContactForm from './ContactForm';

class EditContactModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: _.get(this.props, 'contact.key', undefined),
      type: _.get(this.props, 'contact.type', undefined),
      value: _.get(this.props, 'contact.value', undefined),
    }
  }

  handleSaveContact = () => {
    this.props.onSave(_.assign({}, this.props.contact, _.pickBy(this.state)));
    this.props.onClose();
  }

  handleDeleteContact = () => {
    this.props.onDelete(_.get(this.props, 'contact.key'));
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
    return (
      <EditModal
        open={this.props.open}
        onClose={this.props.onClose}
        onDelete={this.handleDeleteContact}
        onSave={this.handleSaveContact}
      >
        <ContactForm contact={this.props.contact} onChange={this.handleFormChange} />
      </EditModal>
    )
  }
}

export default EditContactModal;
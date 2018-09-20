import _ from 'lodash';
import './Contact.css';
import React from 'react';
import ReactModal from 'react-modal';

import AddButton from '../Buttons/AddButton/AddButton';
import AddContactForm from '../AddContactForm';
import CloseButton from '../Buttons/CloseButton/CloseButton';

import base from '../../services/base';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      contacts: {}
    };
  }

  componentDidMount() {
    this.ref = base.syncState('contacts', {
      context: this,
      state: 'contacts'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }


  addContact = (type, value) => {
    const contacts = this.state.contacts;
    contacts[`contact${Date.now()}`] = { type, value };
    this.setState({ contacts });
  };

  // START: Modal handlers

  handleOpenModal = () => {
    this.setState({
      showModal: true
    });
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  }

  // END: Modal handlers

  renderContact = (key) => {
    const contact = this.state.contacts[key];

    return (
      <div className="contact-container" key={key}>
        <div className="contact-header">{contact.type}</div>
        <div className="contact-data">{contact.value}</div>
      </div>
    )
  }

  render() {
    return (
      <div className="component-container">
        <div className="component-title">
          Contact
          <AddButton onClick={this.handleOpenModal} />
        </div>
        <div className="component-content flex horizontal wrap space-evenly">
          {_.keys(this.state.contacts).map(this.renderContact)}
        </div>

        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
        >
          <AddContactForm addContact={this.addContact} />
          <CloseButton onClick={this.handleCloseModal} />
        </ReactModal>
      </div>
    );
  }
}

export default Contact;
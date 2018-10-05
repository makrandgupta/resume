import _ from 'lodash';
import './Contact.css';
import React from 'react';

import AddButton from '../Buttons/AddButton/AddButton';
import AddContactForm from '../AddContactForm';

import base from '../../services/base';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddContactForm: false,
      contacts: {},
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
    this.handleCloseAddContactForm();
  };

  // START: Form display handlers

  handleOpenAddContactForm = () => {
    console.log('open add contact form called')
    this.setState({
      showAddContactForm: true
    });
  }

  handleCloseAddContactForm = () => {
    this.setState({
      showAddContactForm: false
    });
  }

  // END: Form display handlers

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
          <AddButton onClick={this.handleOpenAddContactForm} />
        </div>
        {this.state.showAddContactForm && <AddContactForm addContact={this.addContact} />}
        <div className="component-content flex horizontal wrap space-evenly">
          {_.keys(this.state.contacts).map(this.renderContact)}
        </div>

      </div>
    );
  }
}

export default Contact;
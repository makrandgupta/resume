import _ from 'lodash';
import './Contact.css';
import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import SectionHeader from '../SectionHeader';

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
      <Segment key={key}>
        <Header as="h3" textAlign="left">{contact.type}</Header>
        <div className="contact-data">{contact.value}</div>
      </Segment>
    )
  }

  render() {
    return (
      <Container>
        <SectionHeader
          sectionName="Contact"
          openAddForm={this.handleOpenAddContactForm}
          closeAddForm={this.handleCloseAddContactForm}
        />

        {this.state.showAddContactForm && <AddContactForm addContact={this.addContact} />}
        <Segment.Group horizontal>
          {/* TODO: dynamically switch to vertical segment group based on content + screen size */}
          {_.keys(this.state.contacts).map(this.renderContact)}
        </Segment.Group>
      </Container>
    );
  }
}

export default Contact;

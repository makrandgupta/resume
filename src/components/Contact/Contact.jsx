import _ from 'lodash';
import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import base from '../../services/base';
import { AuthContext } from '../Auth/AuthContext';
import EditButton from '../Buttons/EditButton';
import EditModal from '../EditModal';
import SectionHeader from '../SectionHeader';
import ContactForm from './ContactForm';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: {},
      contactToEdit: {},
      showAddContactForm: false,
      showEditContactModal: false,
      uid: '',
    };
  }

  componentDidMount() {
    this.ref = base.syncState(`${this.state.uid}/contacts`, {
      context: this,
      state: 'contacts'
    });
  }

  componentDidUpdate() {
    if (this.state.uid !== this.context.uid) {
      this.setState({
        uid: this.context.uid
      });
      base.removeBinding(this.ref);
      this.ref = base.syncState(`${this.context.uid}/contacts`, {
        context: this,
        state: 'contacts'
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  handleAddContact = ({ type, value }) => {
    const contacts = { ...this.state.contacts };
    contacts[`contact${Date.now()}`] = { type, value };
    this.setState({ contacts });
    this.handleCloseAddContactForm();
  };

  handleSaveContact = ({ key, type, value }) => {
    const contacts = { ...this.state.contacts };
    contacts[key] = { type, value };
    this.setState({ contacts });
  }

  handleDeleteContact = (contactKey) => {
    const contacts = { ...this.state.contacts };
    contacts[contactKey] = null;
    this.setState({ contacts });
  }

  // START: Form display handlers

  handleOpenAddContactForm = () => {
    this.setState({
      showAddContactForm: true
    });
  }

  handleCloseAddContactForm = () => {
    this.setState({
      showAddContactForm: false
    });
  }

  handleOpenEditContact = (contactKey) => {
    this.setState({
      showEditContactModal: true,
      contactToEdit: {
        key: contactKey,
        ...(this.state.contacts[contactKey])
      }
    })
  }

  handleCloseEditContact = () => {
    this.setState({
      showEditContactModal: false
    })
  }

  // END: Form display handlers

  renderContact = (key) => {
    const contact = this.state.contacts[key];

    return (
      <Segment key={key}>
        <Header as="h3" textAlign="left">
          {contact.type}
          <EditButton onClick={() => this.handleOpenEditContact(key)} />
        </Header>
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
          isFormOpen={this.state.showAddContactForm}
        />

        {this.state.showAddContactForm && <ContactForm onAdd={this.handleAddContact} inverted />}
        <Segment.Group horizontal>
          {/* TODO: dynamically switch to vertical segment group based on content + screen size */}
          {_.keys(this.state.contacts).map(this.renderContact)}
        </Segment.Group>

        <EditModal
          section="contact"
          data={this.state.contactToEdit}
          open={this.state.showEditContactModal}
          onClose={this.handleCloseEditContact}
          onDelete={this.handleDeleteContact}
          onSave={this.handleSaveContact}
        />
      </Container>
    );
  }
}

Contact.contextType = AuthContext;

export default Contact;

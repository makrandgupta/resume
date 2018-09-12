import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { contact } from '../../data.json';
import AddButton from '../Buttons/AddButton/AddButton';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import './Contact.css';


export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact,
      showModal: true,
      newType: '',
      newValue: '',
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleOpenModal() {
    this.setState({
      showModal: true,
    });
  }

  handleCloseModal() {
    this.setState({
      showModal: false,
    });
  }

  handleFormChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="component-container">
        <div className="component-title">
          Contact
          <AddButton onClick={this.handleOpenModal} />
        </div>
        <div className="component-content flex horizontal wrap space-evenly">
          {
            this.state.contact.map((contact, i) => (
              <div className="contact-container" key={i}>
                <div className="contact-header">{contact.type}</div>
                <div className="contact-data">{contact.value}</div>
              </div>
            ))
          }
        </div>

        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
        >
          <form>
            <input type="text" name="newType" onChange={this.handleFormChange} placeholder="What's the type of contact?" value={this.state.newType}/>
            <input type="text" name="newValue" onChange={this.handleFormChange} placeholder="What's the contact info?"  value={this.state.newValue}/>
            <button>Add Contact</button>
          </form>
          <CloseButton onClick={this.handleCloseModal} />
        </ReactModal>
      </div>
    );
  }
}
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
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
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

  render() {
    return (
      <div className="component-container">
        <div className="component-title">
          Contact
          <AddButton onClick={this.handleOpenModal}/>
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
          Type: [INPUT CONTACT TYPE] <br />
          Value: [INPUT CONTACT VALUE]
          <CloseButton onClick={this.handleCloseModal} />
        </ReactModal>
      </div>
    );
  }
}
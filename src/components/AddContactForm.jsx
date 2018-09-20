import React from 'react';

class AddContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { newType, newValue } = this.state;
    this.props.addContact(newType, newValue);
    this.setState({
      newType: '',
      newValue: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          type="text"
          name="newType"
          onChange={this.handleFormChange}
          placeholder="What's the type of contact?"
          value={this.state.newType}
        />
        <input
          type="text"
          name="newValue"
          onChange={this.handleFormChange}
          placeholder="What's the contact info?"
          value={this.state.newValue}
        />
        <button>Add Contact</button>
      </form>
    )
  }
}

export default AddContactForm;
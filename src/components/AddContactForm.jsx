import React from 'react';
import { Form, Segment } from 'semantic-ui-react';

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
      <Segment inverted>
        <Form onSubmit={this.handleFormSubmit} inverted>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Type</label>
              <input
                name="newType"
                onChange={this.handleFormChange}
                placeholder="e.g. Phone, Email, Skype, etc."
                value={this.state.newType}
              />
            </Form.Field>
            <Form.Field>
              <label>Value</label>
              <input
                type="text"
                name="newValue"
                onChange={this.handleFormChange}
                placeholder="Contact Value"
                value={this.state.newValue}
              />
            </Form.Field>
          </Form.Group>
            <Form.Button type='submit'>Add Contact</Form.Button>
        </Form>
      </Segment>
    )
  }
}

export default AddContactForm;
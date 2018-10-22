import _ from 'lodash';
import React from 'react';
import { Form, Segment } from 'semantic-ui-react';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...(_.get(this.props, 'data')) };
  }

  handleFormChange = (event, data) => {
    const src = _.isEmpty(data) ? event.target : data;
    // Checkbox component uses 'checked' instead of 'value' to store the current state
    src.value = _.get(src, 'type') === 'checkbox' ? src.checked : src.value;
    this.setState({
      [src.name]: src.value
    });
    if (this.props.onChange) {
      this.props.onChange(event, data)
    }
  }


  handleFormSubmit = (event) => {
    event.preventDefault();
    const { type, value } = this.state;
    if (this.props.onAdd) {
      this.props.onAdd({
        type,
        value
      });
      this.setState({
        type: '',
        value: ''
      });
    }
  }

  render() {
    return (
      <Segment inverted={this.props.inverted}>
        <Form onSubmit={this.handleFormSubmit} inverted={this.props.inverted}>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Type</label>
              <input
                name="type"
                onChange={this.handleFormChange}
                placeholder="e.g. Phone, Email, Skype, etc."
                value={this.state.type}
              />
            </Form.Field>
            <Form.Field>
              <label>Value</label>
              <input
                type="text"
                name="value"
                onChange={this.handleFormChange}
                placeholder="Contact Value"
                value={this.state.value}
              />
            </Form.Field>
          </Form.Group>
          {this.props.onAdd && <Form.Button basic inverted type='submit'>Add Contact</Form.Button>}
        </Form>
      </Segment>
    )
  }
}

export default ContactForm;
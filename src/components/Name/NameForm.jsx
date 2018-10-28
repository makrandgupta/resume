import _ from 'lodash';
import React from 'react';
import { Form, Segment } from 'semantic-ui-react';

class NameForm extends React.Component {
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

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { name } = this.state;
    if (this.props.onAdd) {
      this.props.onAdd({ name });
      this.setState({
        name: '',
      });
    }
  }

  render() {
    return (
      <Segment inverted>
        <Form onSubmit={this.handleFormSubmit} inverted>
          <Form.Field>
            <label>Name</label>
            <input
              name="name"
              onChange={this.handleFormChange}
              placeholder="Name"
              value={this.state.name}
            />
          </Form.Field>
          {this.props.onAdd && <Form.Button type='submit'>Add Name</Form.Button>}
        </Form>
      </Segment>
    )
  }
}

export default NameForm;
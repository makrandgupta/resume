import _ from 'lodash';
import React from 'react';
import { Form, Segment } from 'semantic-ui-react';

class EducationForm extends React.Component {
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
    const { degree, field, school, city, country } = this.state;
    if (this.props.onAdd) {
      this.props.onAdd({
        degree,
        field,
        school,
        city,
        country,
      });
      this.setState({
        degree: '',
        field: '',
        school: '',
        city: '',
        country: '',
      });
    }
  }

  render() {
    return (
      <Segment inverted>
        <Form onSubmit={this.handleFormSubmit} inverted>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Degree</label>
              <input
                type="text"
                name="degree"
                onChange={this.handleFormChange}
                placeholder="Degree"
                value={this.state.degree}
              />
            </Form.Field>
            <Form.Field>
              <label>Field</label>
              <input
                type="text"
                name="field"
                onChange={this.handleFormChange}
                placeholder="Field"
                value={this.state.field}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Field>
              <label>School</label>
              <input
                type="text"
                name="school"
                onChange={this.handleFormChange}
                placeholder="School"
                value={this.state.school}
              />
            </Form.Field>
            <Form.Group widths={2}>
              <Form.Field>
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  onChange={this.handleFormChange}
                  placeholder="City"
                  value={this.state.city}
                />
              </Form.Field>
              <Form.Field>
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  onChange={this.handleFormChange}
                  placeholder="Country"
                  value={this.state.country}
                />
              </Form.Field>
            </Form.Group>
          </Form.Group>
          {this.props.onAdd && <Form.Button type='submit'>Add Education</Form.Button>}
        </Form>
      </Segment>
    )
  }
}

export default EducationForm;
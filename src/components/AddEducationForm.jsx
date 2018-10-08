import React from 'react';
import { Form, Segment } from 'semantic-ui-react';

class AddEducationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      degree: '',
      field: '',
      school: '',
      city: '',
      country: '',
    };
  }

  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { degree, field, school, city, country } = this.state;
    this.props.addEducation({
      degree,
      field,
      school,
      location: {
        city, 
        country,
      },
    });
    this.setState({
      degree: '',
      field: '',
      school: '',
      city: '',
      country: '',
    });
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
          <Form.Button type='submit'>Add Education</Form.Button>
        </Form>
      </Segment>
    )
  }
}

export default AddEducationForm;
import _ from 'lodash';
import React from 'react';
import { Form, Segment, TextArea, Dropdown } from 'semantic-ui-react';

const MONTHS = [
  { text: 'January', value: 1 },
  { text: 'February', value: 2 },
  { text: 'March', value: 3 },
  { text: 'April', value: 4 },
  { text: 'May', value: 5 },
  { text: 'June', value: 6 },
  { text: 'July', value: 7 },
  { text: 'August', value: 8 },
  { text: 'September', value: 9 },
  { text: 'October', value: 10 },
  { text: 'November', value: 11 },
  { text: 'December', value: 12 },
];

const YEARS = [];
const maxYear = new Date().getFullYear();
const minYear = maxYear - 100;
for (let year = maxYear; year >= minYear; year--) {
  YEARS.push({
    text: year,
    value: year,
  })
}

class AddExperienceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      title: '',
      description: '',
      fromMonth: '',
      fromYear: '',
      currentPosition: false,
      toMonth: '',
      toYear: '',
      city: '',
      country: '',
    };
  }

  handleFormChange = (event, data) => {
    const src = _.isEmpty(data) ? event.target : data;
    // Checkbox component uses 'checked' instead of 'value' to store the current state
    src.value = _.get(src, 'type') === 'checkbox' ? src.checked : src.value;
    this.setState({
      [src.name]: src.value
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { company, title, description, fromMonth, fromYear, currentPosition, toMonth, toYear, city, country } = this.state;
    this.props.addExperience({
      company,
      title,
      description,
      from: {
        month: fromMonth,
        year: fromYear,
      },
      currentPosition,
      to: {
        month: toMonth,
        year: toYear,
      },
      location: {
        city,
        country,
      },
    });
    this.setState({
      company: '',
      title: '',
      description: '',
      fromMonth: '',
      fromYear: '',
      currentPosition: false,
      toMonth: '',
      toYear: '',
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
              <label>Title</label>
              <input
                name="title"
                onChange={this.handleFormChange}
                placeholder="Title"
                value={this.state.title}
              />
            </Form.Field>
            <Form.Field>
              <label>Company</label>
              <input
                name="company"
                onChange={this.handleFormChange}
                placeholder="Company"
                value={this.state.company}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Description</label>
            <TextArea
              placeholder="Description"
              name="description"
              onChange={this.handleFormChange}
              value={this.state.description}
            />
          </Form.Field>
          <Form.Field>
            <Form.Checkbox
              label="I currently work here"
              checked={this.state.currentPosition}
              name="currentPosition"
              onChange={this.handleFormChange}
            />
          </Form.Field>
          <Form.Group widths={4}>
            <Form.Field>
              <label>From</label>
              <Dropdown
                placeholder='Select Month'
                fluid
                selection
                name="fromMonth"
                options={MONTHS}
                onChange={this.handleFormChange}
                value={this.state.fromMonth}
              />
            </Form.Field>
            <Form.Field>
              <label>&nbsp;</label>
              <Dropdown
                placeholder='Select Year'
                fluid
                selection
                name="fromYear"
                options={YEARS}
                onChange={this.handleFormChange}
                value={this.state.fromYear}
              />
            </Form.Field>
            {!this.state.currentPosition && (
              <Form.Field>
                <label>To</label>
                <Dropdown
                  placeholder='Select Month'
                  fluid
                  selection
                  name="toMonth"
                  options={MONTHS}
                  onChange={this.handleFormChange}
                  value={this.state.toMonth}
                />
              </Form.Field>
            )}
            {!this.state.currentPosition && (
              <Form.Field>
                <label>&nbsp;</label>
                <Dropdown
                  placeholder='Select Year'
                  fluid
                  selection
                  name="toYear"
                  options={YEARS}
                  onChange={this.handleFormChange}
                  value={this.state.toYear}
                />
              </Form.Field>
            )}
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>City</label>
              <input
                name="city"
                onChange={this.handleFormChange}
                placeholder="City"
                value={this.state.city}
              />
            </Form.Field>
            <Form.Field>
              <label>Country</label>
              <input
                name="country"
                onChange={this.handleFormChange}
                placeholder="Country"
                value={this.state.country}
              />
            </Form.Field>
          </Form.Group>
          <Form.Button type='submit'>Add Experience</Form.Button>
        </Form>
      </Segment>
    )
  }
}

export default AddExperienceForm;
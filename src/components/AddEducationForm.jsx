import React from 'react';

class AddEducationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      degree: '',
      field: '',
      school: '',
      location: {
        city: '',
        country: '',
      },
    };
  }

  handleFormChange = (e) => {
    console.log('got target', e.target.name)
    if (e.target.name.includes('location')) {
      const targetName = e.target.name.replace('location.', '');
      console.log('setting', targetName);
      return this.setState({
        location: {
          [targetName]: e.target.value
        }
      })
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { degree, field, school, location } = this.state;
    this.props.addEducation({
      degree,
      field,
      school,
      location,
    });
    this.setState({
      degree: '',
      field: '',
      school: '',
      location: {
        city: '',
        country: '',
      },
    });
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          type="text"
          name="degree"
          onChange={this.handleFormChange}
          placeholder="What degree did you get?"
          value={this.state.degree}
        />
        <input
          type="text"
          name="field"
          onChange={this.handleFormChange}
          placeholder="In what field did you get the degree?"
          value={this.state.field}
        />
        <input
          type="text"
          name="school"
          onChange={this.handleFormChange}
          placeholder="In what school did you get the degree?"
          value={this.state.school}
        />
        <input
          type="text"
          name="location.city"
          onChange={this.handleFormChange}
          placeholder="In what city did you get the degree?"
          value={this.state.location.city}
        />
        <input
          type="text"
          name="location.country"
          onChange={this.handleFormChange}
          placeholder="In what country did you get the degree?"
          value={this.state.location.country}
        />
        <button>Add Contact</button>
      </form>
    )
  }
}

export default AddEducationForm;
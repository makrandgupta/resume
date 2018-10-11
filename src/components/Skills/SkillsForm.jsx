import React from 'react';
import { Form, Segment } from 'semantic-ui-react';

class SkillsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillName: '',
    };
  }

  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { skillName } = this.state;
    this.props.addSkill({ name: skillName });
    this.setState({
      skillName: '',
    });
  }

  render() {
    return (
      <Segment inverted>
        <Form onSubmit={this.handleFormSubmit} inverted>
          <Form.Field>
            <label>Skill</label>
            <input
              name="skillName"
              onChange={this.handleFormChange}
              placeholder="Skill"
              value={this.state.skillName}
            />
          </Form.Field>
          <Form.Button type='submit'>Add Skill</Form.Button>
        </Form>
      </Segment>
    )
  }
}

export default SkillsForm;
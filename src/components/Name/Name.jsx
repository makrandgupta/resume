import _ from 'lodash';
import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import base from '../../services/base';
import EditButton from '../Buttons/EditButton';
import EditModal from '../EditModal';

class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditNameModal: false,
      name: '',
    };
  }

  componentDidMount() {
    this.ref = base.syncState('name', {
      context: this,
      state: 'name'
    });
  }

  componentDidUpdate() {
    console.log('Name update', this.state);
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  handleSaveName = ({ name }) => {
    this.setState({ name });
  }

  // START: Form display handlers

  handleOpenEditName = () => {
    this.setState({
      showEditNameModal: true,
    })
  }

  handleCloseEditName = () => {
    this.setState({
      showEditNameModal: false
    })
  }

  // END: Form display handlers

  render() {
    return (
      <Container>

        <Header as="h1" textAlign="center">
          {this.state.name}
          <EditButton onClick={() => this.handleOpenEditName()} />
        </Header>

        <EditModal
          section="name"
          data={this.state}
          open={this.state.showEditNameModal}
          onClose={this.handleCloseEditName}
          onSave={this.handleSaveName}
        />
      </Container>
    );
  }
}

export default Name;

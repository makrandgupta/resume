import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import base from '../../services/base';
import EditButton from '../Buttons/EditButton';
import EditModal from '../EditModal';
import { AuthContext } from '../../services/AuthContext';

class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      name: '',
      showEditNameModal: false,
    };
  }

  async componentDidMount() {
    console.log('auth', this.state)
    this.ref = base.syncState(`${this.state.uid}/name`, {
      context: this,
      state: 'name'
    });
  }

  componentDidUpdate() {
    if (this.state.uid !== this.context.uid) {
      this.setState({
        uid: this.context.uid
      });
      console.log('auth update', this.context.uid);
      base.removeBinding(this.ref);
      this.ref = base.syncState(`${this.context.uid}/name`, {
        context: this,
        state: 'name'
      });
      console.log('state contents', this.state);
      // this.forceUpdate();
    }
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

Name.contextType = AuthContext;

export default Name;

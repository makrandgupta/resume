import firebase from 'firebase';
import React from 'react';
import { Container, Divider, Header } from 'semantic-ui-react';
import Contact from './components/Contact/Contact';
import Education from './components/Education/Education';
import Experience from './components/Experience/Experience';
import Login from './components/Login';
import Skill from './components/Skill/Skill';
import base, { firebaseApp } from './services/base';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    this.ref = base.syncState('name', {
      context: this,
      state: 'name'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  authHandler = async (authData) => {
    console.log(authData);
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }

  render() {
    return (
      <Container style={{ marginTop: '3em', marginBottom: '3em' }} text>
        <Login authenticate={this.authenticate} />
        <Header as="h1" textAlign="center">{this.state.name}</Header>
        <Contact />
        <Divider hidden />
        <Experience />
        <Divider hidden />
        <Skill />
        <Divider hidden />
        <Education />
      </Container>
    );
  }
}

export default App;

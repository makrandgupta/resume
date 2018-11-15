import _ from 'lodash';
import React from 'react';
import { Container, Divider } from 'semantic-ui-react';
import Auth from './components/Auth/Auth';
import { AuthProvider } from './components/Auth/AuthContext';
import Contact from './components/Contact/Contact';
import Education from './components/Education/Education';
import Experience from './components/Experience/Experience';
import Name from './components/Name/Name';
import Skill from './components/Skill/Skill';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
    };
  }

  handleSignIn = (uid) => {
    this.setState({ uid });
  }

  handleSignOut = async () => {
    this.setState({ uid: null });
  };

  render() {
    return (
      <Container style={{ marginTop: '3em', marginBottom: '3em' }} text>
        <Auth onSignIn={this.handleSignIn} onSignOut={this.handleSignOut} />

        {!_.isEmpty(this.state.uid) && (
          <AuthProvider value={{ uid: this.state.uid }}>
            <Name />
            <Contact />
            <Divider hidden />
            <Experience />
            <Divider hidden />
            <Skill />
            <Divider hidden />
            <Education />
          </AuthProvider>
        )}
      </Container>
    );
  }
}

export default App;

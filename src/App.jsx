import React from 'react';
// import './App.css';
import { Container, Header, Divider } from 'semantic-ui-react';
import Contact from './components/Contact/Contact';
import Education from './components/Education/Education';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';

import base from './services/base';


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

  render() {
    return (
      <Container style={{ marginTop: '3em', marginBottom: '3em' }} text>
        <Header as="h1" textAlign="center">{this.state.name}</Header>
        <Contact />
        <Divider hidden/>
        <Experience />
        <Divider hidden/>
        <Skills />
        <Divider hidden/>
        <Education />
      </Container>
    );
  }
}

export default App;

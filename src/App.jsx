import React from 'react';
import './App.css';
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
      <div className="app">
        <div className="app-title">{this.state.name}</div>
        <Contact />
        <Experience />
        <Skills />
        <Education />
      </div>
    );
  }
}

export default App;

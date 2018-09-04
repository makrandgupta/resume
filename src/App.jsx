import React, { Component } from 'react';
import './styles.css';
import { name } from './data.json';
import Contact from './components/Contact/Contact';
import Education from './components/Education/Education';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name,
    };
  }
	
  render() {
    return (
      <div className="app">
        <div className="app-title">{this.state.name}</div>
        <Contact/>

        <Education/>
        <Experience/>
        <Skills/>
      </div>
    );
  }
}

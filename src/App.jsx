import React, { Component } from 'react';
import './App.css'

class App extends Component {
	temp = 'test';

	constructor(props) {
		super(props);
		this.state = {
			contact: {
				name: 'Makrand'
			},
			xp: []
		}
	}


	render() {
		return (
			<div className="App">
				<div>Here is my resume</div>
				<div>
					<div>
						<div>Contact</div>
						<div>Name: {this.temp}</div>
					</div>
					<div>Experience</div>
					<div>Education</div>
					<div>Skills</div>
				</div>
			</div>
		)
	}
}

export default App;
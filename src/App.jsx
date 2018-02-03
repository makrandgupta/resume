import React, { Component } from 'react';
import './App.css'

class App extends Component {
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
				<div>MAKRAND GUPTA</div>
				<div>
					<div>
						<div>Contact</div>
						<div>Name: {this.state.contact.name}</div>
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
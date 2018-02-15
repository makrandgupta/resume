import React, { Component } from 'react';
import './App.css'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contact: {
				name: 'Makrand Gupta',
				email: 'makrand1996@gmail.com',
			},
			education: 'UofT',
			xp: [],
		}
	}


	render() {
		return (
			<div className="App">
				<div>{this.state.contact.name}</div>
				<div>
					<div>
						<div>Contact</div>
						<div>Email: {this.state.contact.email}</div>
					</div>
					<div>Experience</div>
					<div>Education: {this.state.education}</div>
					<div>Skills: ReactJS</div>
				</div>
			</div>
		)
	}
}

export default App;
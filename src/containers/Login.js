import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import { Auth } from 'aws-amplify';
import axios from 'axios';

import './Login.css';

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			email: 'test@zach.com',
			password: 'password2'
		};
	}

	validateForm() {
		return this.state.email.length > 0 && this.state.password.length > 0;
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	handleSubmit = async event => {
		event.preventDefault();

		this.setState({ isLoading: true });

		try {
			await Auth.signIn(this.state.email, this.state.password);
			this.props.userHasAuthenticated(true);
			this.props.history.push('/requests');
			
				//**********  */POST function here: Danielle Sprint 2 feature: Log js events from broswer to AWS CW
				//Setting message parameter in the url to be accessed in AWS services
				var url = 'https://tqzb08t6al.execute-api.us-east-2.amazonaws.com/development/cloudwatch?message=hello;
				var data = {username: 'example'};

				//axios takes care of the response data and JSON format, 
				//and also handles headers and other parameters automatically
				axios.post(url)
				.then(data => console.log(data))
				.catch(err => console.err(err))
				//end POST

		} catch (e) {
			alert(e.message);
			this.setState({ isLoading: false });
		}

	render() {
		return (
			<div className="Login">
				<form onSubmit={this.handleSubmit}
					
				>
					<FormGroup controlId="email" bsSize="large">
						<ControlLabel>Email</ControlLabel>
						<FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange} />
					</FormGroup>
					<FormGroup controlId="password" bsSize="large">
						<ControlLabel>Password</ControlLabel>
						<FormControl value={this.state.password} onChange={this.handleChange} type="password" />
					</FormGroup>
					<LoaderButton
						block
						bsSize="large"
						disabled={!this.validateForm()}
						type="submit"
						isLoading={this.state.isLoading}
						text="Login"
						loadingText="Logging in…"
					/>
				</form>
			</div>
		);
	}
}

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios'

import './Requests.css';

export default class Requests extends Component {
	constructor(props) {
		super(props);

		this.state = {
			putData: '',
			getData: null,
			isLoading: false
		};

		this.handleGet = this.handleGet.bind(this)
		this.handlePut = this.handlePut.bind(this)
		
	}


	handleGet () {

		console.log("Get Dates button clicked");
		axios.get('https://flt5sd48q6.execute-api.us-west-2.amazonaws.com/test/get')
		// .then(response => console.log(JSON.stringify(response.data.Items)))
		.then(response => this.setState({getData: response.data.Items}))
		.catch(error => console.log(error));
	};

	handlePut() {

		console.log("Put Date button clicked");
		axios.post('https://flt5sd48q6.execute-api.us-west-2.amazonaws.com/test/postdate')
		.then(response => this.setState({putData: response.data}))
		.catch(error => console.log(error));
	};


	render() {
		return (
			<div className="Requests">
				<Button variant="primary" size="lg" block onClick={this.handleGet}>
					Get Dates
				</Button>
				<p>Dates: {JSON.stringify(this.state.getData)}</p>
				<Button variant="secondary" size="lg" block onClick={this.handlePut}>
					Write Date
				</Button>
				<p>Write to DB response: {this.state.putData}</p>
				{/* <LoaderButton
					block
					bsSize="large"
					disabled={!this.handleGetRequest()}
					type="submit"
					isLoading={this.state.isLoadingGet}
					text="Get Dates"
					loadingText="Getting dates…"
				/>
				<LoaderButton
					block
					bsSize="large"
					disabled={!this.handlePutRequest()}
					type="submit"
					isLoading={this.state.isLoadingPut}
					text="Write Date"
					loadingText="Writing date…"
				/> */}
			</div>
		);
	}
}

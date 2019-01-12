import React from 'react';
//
import Button from "../ui/Button";
// css
import {DexColorTheme} from "../../data/dex-material-color-theme";
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {StyledMethod} from "./styles/StyledMethod";
import TextField from '@material-ui/core/TextField';
//
import PropTypes from 'prop-types';

class Method extends React.PureComponent{
	//
	constructor(props){
		super(props);
		this.state = {
			values: {},
			results: []
		}
	}

	/* Handle Events */
	handleClickSendButton = (evt) => {
		evt.preventDefault();
		this.props.onSend(this.props.data.name, this.state.values, (data) => {
			if(data){
				let results;
				if(typeof data === 'object') results = Object.values(data);
				else results = [data];
				this.setState({
					results: results,
				});
			}
		});
	}
	handleChange = id => event => {
		let newValues = Object.assign({}, this.state.values);
		newValues[id] = event.target.value;
		this.setState({
			values: newValues
		})
	}


	//
	colorTheme = createMuiTheme(DexColorTheme);
	render(){
		const data = this.props.data;
		const inputs = data.inputs || [];
		const outputs = data.outputs || [];
		const result = this.props.result || "";
		//
		const inputFields = inputs.map((input, i) => {
			const name = input.name || "";
			const type = input.type || "";
			const label = name + " (" + type + ")";
			const id = "field_"+i;
			return (
				<TextField
					key={i}
					id={id}
					label={label}
					value={this.state.values[i]}
					margin="normal"
					variant="outlined"
					onChange={this.handleChange(id)}
				/>
			)
		})
		const outputFields = outputs.map((output, i) => {
			const name = output.name || "";
			const type = output.type || "";
			const label = name + " (" + type + ")";
			const results = this.state.results.length ? this.state.results[i] : "";
			return (
				<TextField
					key={i}
					label={label}
					value={results}
					className="output_field"
					multiline
					margin="normal"
					variant="outlined"
					InputProps={{
						readOnly: true,
					}}
				/>
			)

		});

		return (
			<MuiThemeProvider theme={this.colorTheme}>
				<StyledMethod>
					<div className="titleBar">
						<h2>{data.name}({inputs.length})</h2>
						{data.constant ? <div className="constant tag">constant</div> : ""}
						{data.type == "event" ? <div className="event tag">event</div> : ""}
						{data.payable ? <div className="payable tag">payable</div> : ""}
					</div>
		
					<form className="form" noValidate autoComplete="off">
						<div className="columns">
							<div className="input">
								{inputFields}
							</div>
							<div className="output">
								{outputFields}
							</div>
						</div>
						<div className="callBar">
							<Button name={data.name} onClick={this.handleClickSendButton} color="#a146ef" type="filled" size="big" />
						</div>
					</form>
				</StyledMethod>
			</MuiThemeProvider>
		)
	}
}

Method.propTypes = {
	data: PropTypes.object.isRequired,
}

export default Method;
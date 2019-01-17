
import React from 'react';
//import styled from 'styled-components';
// own
import {StyledAxieInputs} from './styles/StyledAxieInputs';
import Textfield from '../ui/Textfield';
import Button from '../ui/Button';

import TextField from '@material-ui/core/TextField';

class AxieInputs extends React.PureComponent{

	constructor(props){
		super(props);
		this.state={
		}
	}

	render(){
		const address = this.props.address;
		const offset = this.props.offset;
		const limit = this.props.limit;
		//
		const onChange = this.props.onChange;
		const onClickSubmit = this.props.onClickSubmit;
		return (
			<div className="axieInput">
				<TextField label={"Address"} value={address} className="textfield address" variant="outlined" margin="dense" onChange={onChange("address")} />
				<TextField label={"Offset"} value={offset} className="textfield offset" variant="outlined" margin="dense" onChange={onChange("offset")} />
				<TextField label={"Limit"} value={limit} className="textfield limit" variant="outlined" margin="dense" onChange={onChange("limit")} />

				<Button onClick={onClickSubmit} name={"Load Axies"} type="filled" color="#42a5ec"/>
			</div>
		);
	}

}

export default AxieInputs;





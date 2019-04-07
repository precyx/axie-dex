import React from 'react';

import Button from "../ui/Button";

import {TextField} from '../ui/TextField/TextField';
//
import {StyledStartScreen} from "./styles/StyledStartScreen";

function StartScreen(props) {
	const {address, onClickLoadAll, onClickLoadPages, onChangeAddress} = {...props};
	console.log("aaa", address);
	return (
		<StyledStartScreen className="startScreen">
		<div className="title">Type in your address</div>

			<TextField
				className="tfield" 
				value={address}
				onChange={onChangeAddress}
				isControlled={true}
			 />
							
			<div className="bar">
				<Button onClick={onClickLoadAll} className="loadBreedingAxiesButton" name="Load All Axies" type="filled" color="#a146ef" /> 
				<Button onClick={onClickLoadPages} className="loadAxiePages" name="Load Pages" type="outline" color="#a146ef" />
			</div>
		</StyledStartScreen>
	);
}

export default StartScreen;
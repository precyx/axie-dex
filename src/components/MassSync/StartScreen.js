import React from 'react';

import Button from "../ui/Button";
import Textfield from "../ui/Textfield";
//
import {StyledStartScreen} from "./styles/StyledStartScreen";

function StartScreen(props) {

	const address = props.address;
	const onClickLoadAll = props.onClickLoadAll;
	const onClickLoadPages = props.onClickLoadPages;
	const onChangeAddress = props.onChangeAddress;
	return (
		<StyledStartScreen className="startScreen">
			<Textfield name="address" value={address} onChange={onChangeAddress}/>
			<div className="bar">
				<Button onClick={onClickLoadAll} className="loadBreedingAxiesButton" name="Load All Axies" type="filled" color="#a146ef" /> 
				<Button onClick={onClickLoadPages} className="loadAxiePages" name="Load Pages" type="outline" color="#a146ef" />
			</div>
		</StyledStartScreen>
	);
}

export default StartScreen;
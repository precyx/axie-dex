import React, {useState} from "react";

import {useToggle} from "./useToggle";

interface Toggle2Props {
	isOn?:boolean,
}

export function Toggle2(props:Toggle2Props){
	const {isOn} = {...props};
	const [toggle, onToggle] = useToggle(props.isOn || false);

	return (
		<h2 onClick={() => {onToggle()}}>sup {toggle ? "on" : "off"}</h2>
	);
}
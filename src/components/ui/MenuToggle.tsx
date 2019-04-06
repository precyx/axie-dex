import React from "react";
import {useToggle} from "./Toggle/useToggle";


interface MenuToggleProps {
	isOn?:boolean,
	children:JSX.Element,
	render:Function,
	className:string,
}

export const MenuToggle = (props:MenuToggleProps):JSX.Element => {

	const [isOn, toggle] = useToggle(props.isOn || false);

	return (
		<div onClick={toggle} className={props.className}>
			{props.children}
			{props.render(isOn)}
		</div>
	);
}
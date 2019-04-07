import React, {useRef} from "react";
import {useToggle} from "./Toggle/useToggle";
import {useOnClickOutside} from "../../hooks/useOnClickOutside";


interface MenuToggleProps {
	isOn?:boolean,
	children:JSX.Element,
	render:Function,
	className:string,
}

export const MenuToggle = (props:MenuToggleProps):JSX.Element => {

	const [isOn, toggle] = useToggle(props.isOn || false);

	const ref:any = useRef<HTMLDivElement>(null);

	useOnClickOutside(ref, () => {toggle(false)});

	return (
		<div ref={ref} onClick={toggle} className={props.className}>
			{props.children}
			{props.render(isOn)}
		</div>
	);
}
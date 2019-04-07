import React, {useState} from "react";

export function useToggle (initialState:boolean){

	const [state, setState] = useState(initialState);
	const toggle:any = (forcedState?:boolean) => {
		if(forcedState === true || forcedState === false) setState(forcedState);
		else setState(state => !state);
	}

	return [state, toggle];
}
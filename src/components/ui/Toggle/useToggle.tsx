
import React, {useState} from "react";

export function useToggle (initialState:boolean){

	const [state, setState] = useState(initialState);
	const toggle:any = () => setState(state => !state);

	return [state, toggle];
}
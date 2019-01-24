import React, { Component } from 'react';
import LunaciaMap from "../Lunacia/LunaciaMap";
import RadioGroup from "../ui/RadioGroup/RadioGroup";


import styled, {css} from 'styled-components';

//CSS
export const StyledLunacia = styled.div`
	.radiogroup {display:flex; justify-content:center; margin-bottom:5px;}

	/* x state */
	${({ colorMode }) => colorMode == "black" && css`
		.plot {background:#333333!important;}
	`}
`;

class Lunacia extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			colorMode: "color"
		}
	}


	handleChangeColorMode = (option) => {
		this.setState({
			colorMode : option,
		})
	}

	render() {
		const colorMode = this.state.colorMode;
		return (
			<StyledLunacia colorMode={colorMode}>
				<h1>Lunacia Map</h1>
				<RadioGroup onChange={this.handleChangeColorMode} type="modern" color="#ff00aa" active_option={colorMode} options={[
						{label: "Color", value: "color"},
						{label: "Black", value: "black"},
					]}/>
				<LunaciaMap />
			</StyledLunacia>
		);
	}
}

export default Lunacia;
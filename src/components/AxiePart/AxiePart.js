import React from 'react';
//import styled from 'styled-components';
// own
import {StyledAxiePart} from './styles/StyledAxiePart';

/**
 * Renders {name, id, class icon} of an {axie}
 * @class AxieTitle
 * @example <AxiePart data={partData} size={"normal" | "small"}/>
 */
class AxiePart extends React.PureComponent{

	constructor(props){
		super(props);
		this.state={
			active: false,
		}
	}

	render(){
		//const active = this.state.active;
		const data = this.props.data;
		const size = this.props.size;
		const {name, img} = {
			name: data.name,
			img:  "./img/parts/" + data.name + "_" + data.type + "_" + data.class + ".png"
		};
		return(
			<StyledAxiePart className="axiePart" size={size}>
				<div className="imgBox">
					<img className="img" src={img} alt="part"/>
				</div>
				<p className="name">{name}</p>
			</StyledAxiePart>
		)
	}

}

export default AxiePart;
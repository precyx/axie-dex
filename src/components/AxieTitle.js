import React from 'react';
import styled from 'styled-components';
import ReactSVG from 'react-svg';
//custom
import axieClassColors from '../data/axie-class-colors';
import AxieOwner from './AxieOwner/AxieOwner';

//CSS
const StyleAxieTitle = styled.div`
	display:flex;
	align-items:left;
	flex-flow:column;

	.name { font-size: 12px; margin-right:5px; color: #949494;}
	.id {color: #8d65ff; border-radius:3px; font-style: italic; font-size: 12px; color: ${props => axieClassColors[props.axieClass]}; }
	.icon {width:16px; height:16px; margin-right:5px;}
	.stageText {color: #6f6f6f; font-size: 18px;}
	.block {display:flex; align-items: center;}
	.line1, .line2 {display:flex; align-items: center;}
	.line1 {justify-content:space-between;}
	.line2 {margin-top:5px;}
	/* axieOwner */
	.axieOwner {width: 55px; overflow: hidden; text-overflow: ellipsis;}
	svg {width:16px;}
`;

/**
 * Renders {name, id, class icon} of an {axie}
 * @class AxieTitle
 * @example <AxieTitle name={name} class={axieClass} id={id} stage={stage} owner={ownerAddress}/>
 */
class AxieTitle extends React.PureComponent {
	stageTexts = {
		1: "Egg",
		2: "Larva",
		3: "Petite",
		4: "Adult",
	}
	render() {
		return (
			<StyleAxieTitle className="axieTitle" axieClass={this.props.class}>
				<div className="line1">
					<div className="block left">
						<a target="_blank" href={"https://axieinfinity.com/axie/" + this.props.id} className="name">{this.props.name} </a>
						{this.props.class ? 
							<ReactSVG className="icon" svgStyle={{fill: axieClassColors[this.props.class]}} src={"./img/icons/classes/" + this.props.class + "_24px.svg"} />
						: ""}
						<div className="id">#{this.props.id}</div>
					</div>
					<div className="block right">
						<AxieOwner owner={this.props.owner} axieClass={this.props}></AxieOwner>
					</div>
					<div style={{display:"none"}} className="class">{this.props.class}</div>
				</div>
				{this.props.stage <= 2 ?
				<div className="line2">
					<div className="stageText">{this.stageTexts[this.props.stage]}</div>
				</div>
				: ""}
			</StyleAxieTitle>
		);
	}
}


export default AxieTitle;
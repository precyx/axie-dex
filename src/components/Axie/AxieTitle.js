import React from 'react';
import ReactSVG from 'react-svg';
//custom
import axieClassColors from '../../data/axie-class-colors';
import AxieOwner from './AxieOwner';
//
import {StyledAxieTitle} from "./styles/StyledAxieTitle";


/**
 * Renders {name, id, class icon} of an {axie}
 * @example <AxieTitle name={name} class={axieClass} id={id} stage={stage} owner={ownerAddress}/>
 */
function AxieTitle(props) {
	const stageTexts = {
		1: "Egg",
		2: "Larva",
		3: "Petite",
		4: "Adult",
	}

	const axieClass = props.class;
	const axieColor = axieClassColors[axieClass];
	const id = props.id;
	const title = props.title;
	const name = props.name;
	const owner = props.owner;
	const stage = props.stage;
	const stageText = stageTexts[stage];

	return (
		<StyledAxieTitle className="axieTitle" color={axieColor}>
			<div className="line line1">
				<div className="block left">
					<div className="idGroup">
						<div className="id">#{id}</div>
					</div>
					{title &&
						<div className="title">{title}</div>
					}
				</div>
				<div className="block right">
					<AxieOwner owner={owner} axieClass={props}></AxieOwner>
				</div>
				<div style={{display:"none"}} className="class">{axieClass}</div>
			</div>
			<div className="line">
				<div className="nameGroup">
				{axieClass ? 
						<ReactSVG className="icon" svgStyle={{fill: axieColor}} src={"./img/icons/classes/" + axieClass + "_24px.svg"} />
					: ""}
					<a target="_blank" href={"https://axieinfinity.com/axie/" + id} className="name">{name} </a>
				</div>
			</div>
			{stage <= 2 ?
			<div className="line2">
				<div className="stageText">{stageText}</div>
			</div>
			: ""}
		</StyledAxieTitle>
	);

}

export default AxieTitle;
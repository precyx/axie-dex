import React from 'react';
//import styled from 'styled-components';
// own
import ReactSVG from 'react-svg';
import {StyledAxiePart} from './styles/StyledAxiePart';
import {dps_bonuses} from "./data/bonuses";
import {type_bonus} from "./data/bonuses";
import axieClassColors from '../../data/axie-class-colors';

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
			features: "default",
		}
	}

	handleClickPart = () => {
		this.setState(prevState => ({
			features: prevState.features == "default" ? "extended" : "default",
		}))
	}


	render(){
		//const active = this.state.active;
		const data = this.props.data;
		const type = this.props.type; // tierlist type either ("dps" || "tank" || "support")
		const size = this.props.size; // size ("normal" || "small")
		const color = this.props.color;
		const features = this.state.features || "default"; // features ("default" || "extended")
		const {id, name, axie_class, img, moves} = {
			id: data.id,
			name: data.name,
			axie_class: data.class,
			img:  "./img/parts/" + data.name + "_" + data.type + "_" + data.class + ".png",
			moves: data.moves[0]
		};
		const effect = moves.effects[0] || "";
		const dps_bonus = dps_bonuses[id] ? dps_bonuses[id] : 0;
		const adps = +(moves.attack * moves.accuracy/100).toFixed(1); // accuracy dps
		const effect_adps = +((moves.attack + dps_bonus) * moves.accuracy/100).toFixed(1); // accuracy dps, with effect

		const type_bonus_plant_plant = type_bonus(axie_class, "plant", "plant");
		const type_bonus_aqua_plant = type_bonus(axie_class, "plant", "aquatic");

		const type1_adps = Math.round(adps + type_bonus_plant_plant);
		const type2_adps = Math.round(adps + type_bonus_aqua_plant);
		const type1_effect_adps = Math.round(effect_adps + type_bonus_plant_plant);
		const type2_effect_adps = Math.round(effect_adps + type_bonus_aqua_plant);

		return(
			<StyledAxiePart className="axiePart" size={size} color={color} axieClass={axie_class} onClick={this.handleClickPart}>
			<div className="part" >
				<div className="imgBox">
					<img className="img" src={img} alt="part"/>
				</div>
				<p className="name">
					<ReactSVG className="class icon" src={`./img/icons/classes/${axie_class}_24px.svg`} />
					{name}
				</p>
				{type == "dps" &&
					<div className="bonuses">
						<div className="bonus">{type_bonus_plant_plant}</div> /
						<div className="bonus">{type_bonus_aqua_plant}</div>
					</div>
				}
			</div>

			<div className="class">
				
			</div>

			<div className="extras">
				{features == "default" &&
					<div>
						{ type == "tank" &&
							<div className="stats">
								<div className="stat def"><ReactSVG className="icon" src={"./img/icons/stats/defense.svg"} />{moves.defense}</div>
							</div>
						}
						{ type == "dps" &&
							<div className="stats">
								{dps_bonus == 0 && 
									<React.Fragment>
										<div className="stat atk"><ReactSVG className="icon" src={"./img/icons/stats/attack.svg"} /> {adps}</div> 
									</React.Fragment>
								}
								{dps_bonus != 0 && 
									<React.Fragment>
										<div className="stat atk_bonus"><ReactSVG className="icon" src={"./img/icons/stats/attack.svg"} /> {adps}</div> 
										<div className="stat atk_bonus"><ReactSVG className="icon" src={"./img/icons/stats/skill.svg"} /> {effect_adps}</div> 
									</React.Fragment>
								}
							</div>
						}
					</div>
				}
				{features == "extended" && 
					<React.Fragment>
					<div className="stats extended">
						<div className="stat atk"><ReactSVG className="icon" src={"./img/icons/stats/attack.svg"} /> {moves.attack}</div>
						<div className="stat def"><ReactSVG className="icon" src={"./img/icons/stats/defense.svg"} /> {moves.defense}</div>
						<div className="stat acc"><ReactSVG className="icon" src={"./img/icons/stats/accuracy.svg"} /> {moves.accuracy}</div>
					</div>
					{effect &&
						<div className="effects">
							<b>{effect.name}</b>
							<p>{effect.description}</p>
						</div>
					}
					</React.Fragment>
				}
			</div>

			</StyledAxiePart>
		)
	}

}

export default AxiePart;
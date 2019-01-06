import React from 'react';
//import styled from 'styled-components';
// own
import {StyledTierList} from './styles/StyledTierList';
import {AXIE_DATA} from "../../services/axie-data-service";
import StatusBox from "../StatusBox";
import AxiePart from "../AxiePart/AxiePart";
import Tier from "./Tier";
import {bodyparts} from "../../data/axie-body-parts";

/**
 * Renders {name, id, class icon} of an {axie}
 * @class AxieTitle
 * @example <TierList/>
 */
class TierList extends React.PureComponent{

	partTierList = {
		"S": {
					tails: ["tail-hot-butt", "tail-tiny-dino"], 
					backs: ["back-pumpkin", "back-red-ear"],
					horns: ["horn-rose-bud", "horn-beech"],
					mouth: ["mouth-zigzag", "mouth-herbivore"]
		},
		"A": {
					tails: ["tail-carrot", "tail-cattail", "tail-thorny-cattepilar"], 
					backs: ["back-hermit", "back-sponge", "back-indian-star", "back-snail-shell", "back-shiitake"],
					horns: ["horn-cerastes", "horn-cactus", "horn-leaf-bug"],
					mouth: ["mouth-serious", "mouth-silence-whisper"]
		},
		"B": {
					tails: ["tail-hatsune", "tail-ant", "tail-snake-jar", "tail-fish-snack", "tail-feather-fan", "tail-potato-leaf", "tail-wall-gecko", "tail-gila", "tail-grass-snake"],
					backs: ["back-bidens", "back-mint", "back-timber"],
					horns: ["horn-bamboo-shoot", "horn-merry", "horn-incisor", "horn-watermelon"],
					mouth: ["mouth-razor-bite", "mouth-toothless-bite", "mouth-tiny-turtle"]
		},
		"C": {
					tails: ["tail-koi", "tail-pupae", "tail-shrimp", "tail-grass-snake", "tail-navaga", "tail-nimo"],
					backs: ["back-bone-sail", "back-turnip", "back-anemone", "back-croc", "back-green-thorns", "back-watering-can"],
					horns: ["horn-lagging", "horn-scaly-spear", "horn-teal-shell", "horn-babylonia", "horn-pliers", "horn-scaly-spoon"],
					mouth: ["mouth-lam", "mouth-pincer", "mouth-piranha", "mouth-risky-fish"],
		},
		"D": {},
		"E": {},
		"F": {},
	};

	componentDidMount(){
		//AXIE_DATA.getBodyParts().then((parts)=>{
			this.setState({
				parts: bodyparts,
			}, () => { this.mapPartsToTierList() });
		//});
	}

	/**
	 * Maps complete {part} data onto the entries in the {tierList}
	 */
	mapPartsToTierList(){
		// create parts lookup table
		let partsLookupTable = {};
		let parts = this.state.parts;
		Object.keys(parts).forEach((key)=>{
			let newKey = parts[key].id;
			partsLookupTable[newKey] = parts[key];
		});
		console.log("partsLookupTable", partsLookupTable);
		// map parts to tierlist
		let tierList = this.partTierList;
		for(const tierKey of Object.keys(tierList)){	
			for(const partGroupKey of Object.keys(tierList[tierKey])){
				let newParts = [];
				tierList[tierKey][partGroupKey].forEach((part)=>{
					if(partsLookupTable[part]) newParts.push(partsLookupTable[part]);
				});
				tierList[tierKey][partGroupKey] = newParts;
			}
		}
		this.setState({
			tierList: tierList,
		});
		console.log("mapped", this.partTierList)
	}

	constructor(props){
		super(props);
		this.state= {parts: null}
	}

	render(){
		// parts
		/*const parts = this.state.parts && this.state.parts.map((part)=>
			<AxiePart data={part} size="small"/>
		);*/
		const loadingParts = <StatusBox status={{msg: "Loading Bodyparts..."}} />
		// tierlist
		const tierList = this.state.tierList;
		const tiers = tierList ? Object.keys(tierList).map((partGroupKey)=>
			<Tier key={partGroupKey} name={partGroupKey} parts={tierList[partGroupKey]} />
		) :  "";
		return(
			<StyledTierList className="tierList">
				{tiers || loadingParts}
			</StyledTierList>
		)
	}

}

export default TierList;
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

	componentDidMount(){
		//AXIE_DATA.getBodyParts().then((parts)=>{
			let partTierList = this.props.parts;
			console.log("p", partTierList)
			this.setState({
				parts: bodyparts,
			}, () => { this.mapPartsToTierList(partTierList) });
		//});
	}
	componentWillUnmount(){

	}

	/**
	 * Maps complete {part} data onto the entries in the {tierList}
	 */
	mapPartsToTierList(_partTierList){
		// create parts lookup table
		let partsLookupTable = {};
		let parts = this.state.parts;
		Object.keys(parts).forEach((key)=>{
			let newKey = parts[key].id;
			partsLookupTable[newKey] = parts[key];
		});
		console.log("partsLookupTable", partsLookupTable);
		// map parts to tierlist
		console.log("tierList", _partTierList);
		let tierList = JSON.parse(JSON.stringify(_partTierList))
		for(let tierKey of Object.keys(tierList)){	
			for(let partGroupKey of Object.keys(tierList[tierKey])){
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
		//console.log("mapped", _partTierList, tierList)
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
		const type = this.props.type;
		const tierList = this.state.tierList;
		const tiers = tierList ? Object.keys(tierList).map((partGroupKey)=>
			<Tier key={partGroupKey} name={partGroupKey} parts={tierList[partGroupKey]} type={type}/>
		) :  "";
		return(
			<StyledTierList className="tierList">
				{tiers || loadingParts}
			</StyledTierList>
		)
	}

}

export default TierList;
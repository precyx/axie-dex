import React from 'react';
import {StyledBreedingData} from './styles/StyledBreedingData';

import {breedingCosts} from "../../data/axie-data";

function BreedingData(props) {

		const axieData 					 				= props.axieData;
		const hasAllXPFields 		 				= (axieData.exp && axieData.pendingExp);
		const pendingXp 				 				= (axieData.pendingExp||0) - (axieData.pendingExp2||0);
		const xp 								 				= axieData.exp;
		const xpForBreeding			 				= breedingCosts[axieData.breedCount+1];
		const hasPendingXp 			 				= pendingXp ? true : false;
		const hasEnoughXpPendingToBreed = hasAllXPFields && (xp + pendingXp) >= xpForBreeding;
		const hasEnoughXpAlreadyToBreed = hasAllXPFields && (xp) >= xpForBreeding;

	//	console.log("xdp", axieData.exp, axieData.pendingExp, axieData.expForBreeding);
		//
		//console.log("ddd", axieData);
		return (


			<StyledBreedingData 
					className="breedingData" 
					hasEnoughXpPendingToBreed={hasEnoughXpPendingToBreed} 
					hasEnoughXpAlreadyToBreed={hasEnoughXpAlreadyToBreed}
					hasPendingXp={hasPendingXp}>
				<div className={"breedingData"}>
					<div className="xpProgress">
						<span className="xp curXp">{(axieData.exp||0) + "xp"}</span>
						/ 
						<span className="xp reqXp">{xpForBreeding + "xp"}</span>
						<span className="breedCount">({axieData.breedCount})</span>
					</div>
					<div className="xpPending">
						<span className="xp penXp"> Pending: <span className="pre val">{pendingXp} EXP</span></span>
					</div>
					
				</div>
			</StyledBreedingData>
		);
	
}

export default BreedingData;
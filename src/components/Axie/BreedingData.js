import React from 'react';
import {StyledBreedingData} from './styles/StyledBreedingData';

class BreedingData extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const axieData 					 				= this.props.axieData;
		const hasAllXPFields 		 				= (axieData.exp && axieData.pendingExp && axieData.expForBreeding);
		const pendingXp 				 				= (axieData.pendingExp||0) - (axieData.pendingExp2||0);
		const xp 								 				= axieData.exp;
		const xpForBreeding			 				= axieData.expForBreeding;
		const hasPendingXp 			 				= pendingXp ? true : false;
		const hasEnoughXpPendingToBreed = hasAllXPFields && (xp + pendingXp) >= xpForBreeding;
		const hasEnoughXpAlreadyToBreed = hasAllXPFields && (xp) >= xpForBreeding;
		//
		return (
			<StyledBreedingData 
					className="breedingData" 
					hasEnoughXpPendingToBreed={hasEnoughXpPendingToBreed} 
					hasEnoughXpAlreadyToBreed={hasEnoughXpAlreadyToBreed}
					hasPendingXp={hasPendingXp}>
				<div className={"breedingData"}>
					<div className="line1">
						<span className="xp curXp">{(axieData.exp||0) + "xp"}</span>
						/ 
						<span className="xp reqXp">{axieData.expForBreeding + "xp"}</span>
					</div>
					<div className="line2">
						<span className="xp penXp"> {pendingXp} EXP</span>
					</div>
				</div>
			</StyledBreedingData>
		);
	}
}

export default BreedingData;
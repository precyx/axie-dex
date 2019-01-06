import React from 'react';
import {StyledSyncController} from './styles/StyledSyncController';
import Axie from "../Axie/Axie/Axie";
import Button from "../ui/Button";

class SyncController extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		// axies 
		const axiesObj = this.props.axies;
		// handlers
		const onClickClearAll = this.props.onClickClearAll;
		const onClickSync = this.props.onClickSync;
		// {/* <div key={axieKey} className="axie">{axiesObj[axieKey].id}</div> */}
		const axies = Object.keys(axiesObj).map(axieKey => 
			<Axie key={axieKey} data={axiesObj[axieKey]} rendering="image" features="breeding" size="tiny" background="none"/>
		);
		//
		return (
			<StyledSyncController className="syncController">
				<div className="axies">
					{axies} 
				</div>
				<div className="btnBar">
					<Button className="syncButton btn" name={"Sync EXP of ("+ Object.keys(axiesObj).length +") Selected Axies"} type="color" color="#a146ef" onClick={onClickSync}/>
					<Button className="clearAllButton btn" name={"Clear all"} type="color" color="#ff4c4c" onClick={onClickClearAll}/>
				</div>
			</StyledSyncController>
		);
	}
}

export default SyncController;
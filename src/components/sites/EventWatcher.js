import React from 'react';
// own
import BasicCenterContainer from "../containers/BasicCenterContainer";
import {StyledEventWatcher} from "./styles/StyledEventWatcher";
//

//
import EtherInterface from "../EtherInterface/EtherInterface";

class EventWatcher extends React.PureComponent{

	componentDidMount() {
	}
	render(){
		return (
			<BasicCenterContainer>
				<StyledEventWatcher>

					<EtherInterface />

				</StyledEventWatcher>
			</BasicCenterContainer>
		)
	}

}

export default EventWatcher;
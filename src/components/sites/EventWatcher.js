import React from 'react';
// own
import BasicCenterContainer from "../containers/BasicCenterContainer";
import {StyledEventWatcher} from "./styles/StyledEventWatcher";
//


class EventWatcher extends React.PureComponent{

	componentDidMount() {
	}
	render(){
		return (
			<BasicCenterContainer>
				<StyledEventWatcher>

					<h1>Event Watcher</h1>

				</StyledEventWatcher>
			</BasicCenterContainer>
		)
	}

}

export default EventWatcher;
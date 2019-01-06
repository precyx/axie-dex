import React from 'react';
import {StyledAxieCheck} from './styles/StyledAxieCheck';
import ReactSVG from "react-svg";

class AxieCheck extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state={checked: false}
	}


	handleCheckerClick = () => {
		this.setState((prevState)=>({
			checked: !prevState.checked
		}), () => {
			this.props.onCheck(this.state.checked, this.props.data);
		});
	}

	render() {
		const checked = this.state.checked;
		return (
			<StyledAxieCheck className="axieCheck" checked={checked}>

				{this.props.disable ?
				<div>
					<div className="checker" onClick={this.handleCheckerClick}>
						<ReactSVG className="checkIcon" src={"./img/icons/general/check_medium.svg"}/>
					</div>
					<div className="overlay">
					</div>
				</div>
				: ""}

				{this.props.children}
			</StyledAxieCheck>
		);
	}
}

export default AxieCheck;
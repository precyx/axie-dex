import React from 'react';
import styled from 'styled-components';

//CSS
const StyledAxieEffect = styled.div`

`;

class AxieEffect extends React.PureComponent {
	render() {
		return (
			<StyledAxieEffect className={"axieEffect" + " " + this.props.className} onClick={this.props.onClick}>
				{this.props.part.moves[0] && this.props.part.moves[0].effects[0] ?
					<div>
						<b>{this.props.part.moves[0].effects[0].name}</b>
						<div>{this.props.part.moves[0].effects[0].description}</div>
					</div>
				: ""}
			</StyledAxieEffect>
		);
	}
}

export default AxieEffect;
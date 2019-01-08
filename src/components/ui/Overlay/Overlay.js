import React from 'react';
import styled from "styled-components";

const StyledOverlay = styled.div`
		background:rgba(255,255,255,0.7); position:fixed; z-index:500; top:0; left:0; width:100%; height:100%;
`;

/**
 * @example <Overlay> content html </Overlay>
 */
class Overlay extends React.PureComponent {
	render() {
		return (
			<StyledOverlay className={"overlay" + " " + this.props.className}>
				{this.props.children}
			</StyledOverlay>
		);
	}
}

export default Overlay;
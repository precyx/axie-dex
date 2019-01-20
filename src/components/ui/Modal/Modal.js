import React from 'react';
import styled from "styled-components";

const StyledModal = styled.div`
	position: fixed;
	z-index:1000;
	left: 0; 
	right: 0; 
	top: 10vh; 
	max-width:500px; 
	max-height:500px; 
	
	border-radius:8px; 
	padding:30px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.23);
	padding: 30px; 
	margin: 0 auto; 
	background: white;
`;

/**
 * @example <Overlay> content html </Overlay>
 */
class Modal extends React.PureComponent {
	render() {
		return (
			<StyledModal className={"modal" + " " + this.props.className}>
				{this.props.children}
			</StyledModal>
		);
	}
}

export default Modal;
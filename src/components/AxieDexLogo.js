import React from 'react';
import styled from 'styled-components';
// components
import ReactSVG from 'react-svg';
//import { isStyledComponent } from 'styled-components';

//CSS
const StyledParts = styled.div`
	svg {width:40px; height:auto; opacity:1;}
`;

function AxieDexLogo(props) {
  return (
		<StyledParts className={props.className}>
			<ReactSVG src={props.logo} width="40" height="40"/>
		</StyledParts>
	);
}

export default AxieDexLogo;
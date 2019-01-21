import styled, {css} from 'styled-components';

//CSS
export const StyledContract = styled.div`

	.header {font-size:14px; color:grey; margin-bottom:5px; height:auto!important; background:none!important;}

	/* x state */
	${({ tag }) => tag == "event" && css`
	
	`}
`;
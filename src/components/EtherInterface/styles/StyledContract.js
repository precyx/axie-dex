import styled, {css} from 'styled-components';

//CSS
export const StyledContract = styled.div`

	width:800px;
	margin:0 auto;

	.header {font-size:14px; color:grey; margin-bottom:5px; height:auto!important;}

	

	/* x state */
	${({ x }) => x && css``}
`;
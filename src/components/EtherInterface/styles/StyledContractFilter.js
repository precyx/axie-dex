import styled, {css} from 'styled-components';

//CSS
export const StyledContractFilter = styled.div`

	margin-top:190px;
	.radiogroup  {display:flex; flex-flow:column;}

	/* x state */
	${({ x }) => x && css``}
`;
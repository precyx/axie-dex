import styled, {css} from 'styled-components';

//CSS
export const StyledMethodFilter = styled.div`

	.radiogroup  {margin-bottom:15px;}
	.radiogroup .radioButton { margin-right: 5px;}

	/* x state */
	${({ x }) => x && css``}
`;
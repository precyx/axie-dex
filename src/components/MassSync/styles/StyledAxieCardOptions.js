import styled, {css} from 'styled-components';

//CSS
export const StyledAxieCardOptions = styled.div`

	display:flex;
	.group {margin-right:20px; }

	/* state x */
	${({ x }) => x && css``}

`;
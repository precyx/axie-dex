import styled, {css} from 'styled-components';

//CSS
export const StyledStartScreen = styled.div`

	.button { padding: 10px 15px; font-size: 14px; margin-left:20px;}
	.bar { flex-flow: row; margin:10px 0; }
	.textfield { justify-content:center; }

	/* state x */
	${({ x }) => x && css``}

`;
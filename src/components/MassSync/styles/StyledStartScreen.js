import styled, {css} from 'styled-components';

//CSS
export const StyledStartScreen = styled.div`

	.button { padding: 10px 15px; font-size: 14px; margin-left:20px;}
	.bar { flex-flow: row; margin:10px 0; }
	.textfield { justify-content:center; }

	.title {margin-bottom:20px; font-size: 22px; font-weight: 500;}
	.tfield input {    min-width: 350px; text-align:center;  padding: 14px 10px; }

	/* state x */
	${({ x }) => x && css``}

`;
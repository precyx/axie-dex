import styled, {css} from 'styled-components';

//CSS
export const StyledConfirmationBox = styled.div`

	/* successBox */
	.modal {max-height:510px;}
	.linkList {height:300px; overflow-y:scroll; height: 300px; overflow-y: scroll; background: #f9f9f9; padding: 15px}
	.linkList .link {font-size:14px; margin-bottom:5px; }
	.title {font-size: 28px; margin-bottom: 10px;}
	.subtitle {font-size: 18px; margin-bottom: 5px; margin-top:30px;}
	.actionBar {display:flex; justify-content:flex-end; margin-top:10px;}

	/* state x */
	${({ x }) => x && css``}

`;
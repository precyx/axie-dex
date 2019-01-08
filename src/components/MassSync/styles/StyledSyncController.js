import styled, {css} from 'styled-components';

//CSS
export const StyledSyncController = styled.div`

	/* state x */
	${({ x }) => x && css``}

	.axies {display:flex; width:100%; padding:10px; height:150px; overflow-y: scroll; background:white; flex-flow:wrap;  align-content: start; 
		border:1px solid #dedede;
    border-radius: 8px;
    padding-bottom: 40px;
    padding-top: 20px;}
	.axie {margin-right:5px; }
	.btnBar { margin-top: 5px; }
	.btnBar .btn {margin-right:5px;}	
`;
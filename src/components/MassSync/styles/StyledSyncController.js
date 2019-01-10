import styled, {css} from 'styled-components';

//CSS
export const StyledSyncController = styled.div`

	/* state x */
	${({ x }) => x && css``}

	.axies {
		display:flex; 
		width:100%; 
		padding:10px; 
		height:180px; 
		overflow-y: scroll; 
		background:white; 
		flex-flow:wrap;  
		align-content: start; 
		border:1px solid #dedede;
    border-radius: 8px;
    padding-bottom: 40px;
    padding-top: 20px;}
	.btnBar { margin-top: 5px; }
	.btnBar .btn {margin-right:5px;}	

	.syncElem {margin-right:5px; position:relative; }
	.syncElem .removeIcon {display:none; position:absolute; z-index:120; top:10px; right:10px; cursor:pointer;}
	.syncElem:hover .removeIcon {display:flex;}
	.syncElem .removeIcon:hover {opacity:0.8; }
	.syncElem .removeIcon, .syncElem svg {width:20px; height:20px; }
	.syncElem svg {color:#666;}
`;
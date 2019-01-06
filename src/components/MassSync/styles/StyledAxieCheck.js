import styled, {css} from 'styled-components';

//CSS
export const StyledAxieCheck = styled.div`
	position:relative;
	width:auto;
	height:auto;
	margin:7px;

	.cardController {display:none!important;}

	.axie {margin:0;}
	.overlay {display:none; background:rgba(255,255,255,0.5); position:absolute; width:100%; height:100%; z-index:100; border-radius: 20px; padding: 10px;}
	.checker {display:none; align-items:center; justify-content:center; position: absolute; z-index: 120; background:rgba(255,255,255,0.8); width:50px; height:50px; border-radius:8px; border:5px solid grey;  bottom: 15px; right:15px; cursor:pointer;}
	:hover .checker {display:flex;}

	.checkIcon {display:none;}
	.checkIcon, .checkIcon svg {display:flex; align-items:center; justify-content:center; width:30px; height:auto;}
	.checkIcon svg {fill:white;}

	/* checked state */
	${({ checked }) => checked && css`
		.checkIcon {display:flex; }
		.overlay {display:flex;}
		.checker {display:flex; background: #90d637; border-color: #90d637; }
	`}
`;
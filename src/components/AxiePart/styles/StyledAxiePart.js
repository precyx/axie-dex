import styled, {css} from 'styled-components';

//CSS
export const StyledAxiePart = styled.div`

	width: 150px;
	height:150px; 
	background:#e9e9e9;
	background:white;
	border-radius:8px;

	display:flex;
	flex-flow:column;
	justify-content:center;
	align-items:center;
	
	cursor:pointer;
	:hover {background:#e9e9e9;}

	.imgBox {width:80px; height:80px; display: flex; align-items: center;}
	.img {max-width:80px; max-height:80px;}
	.name {margin-top:15px; color:rgba(0,0,0,0.8); font-size:14px; font-weight: 500;}

	/* Light Theme */
	${({ size }) => size === "small" && css`
		width:120px;
		height:120px;
		.imgBox {width:50px; height:50px;}
		.img {max-width:50px; max-height:50px;}
		.name {font-size:12px;}
  `}
`;
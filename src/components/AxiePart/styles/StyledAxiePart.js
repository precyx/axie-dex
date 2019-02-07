import styled, {css} from 'styled-components';
import {hexToRGB} from "../../../services/utils";
import axieClassColors from '../../../data/axie-class-colors';

//CSS
export const StyledAxiePart = styled.div`

	position:relative;
	display: flex;
	flex-flow: column;
	align-items: end;
	background: white;
	padding: 10px;
	box-shadow: 0 1px 4px rgba(0,0,0,0.1);
	cursor:pointer;

	.part {
		width: 150px;
		height:150px;
		display:flex;
		flex-flow:column;
		justify-content:center;
		align-items:center;
		border-radius:50%;
	}
	
	.extras {
		border-top: 1px solid rgba(0, 0, 0, 0.08);
		display: flex;
		flex-flow:column;
    justify-content: center;
		width:100%;
	}
	
	:hover .part {background:whitesmoke; }

	.imgBox {width:80px; height:80px; display: flex; align-items: center; justify-content: center;}
	.img {max-width:80px; max-height:80px;}
	.name {display:flex; margin-top:15px; color:rgba(0,0,0,0.8); font-size:14px; font-weight: 500;}
	.name .class.icon {margin-right:5px;}
	.name .class.icon svg {fill: ${props => axieClassColors[props.axieClass] }}
	.stats {
    font-size: 14px;
    align-items: center;
    display: inline-flex;
		align-items: end;
    width: auto;
    margin: 0 auto;
		margin-top: 10px;
		width:100%;
	}
	.stats .stat{display:flex; align-items:center; margin: 0 auto;}
	.stats .stat {
		opacity:1;
		fill:${props => props.color.tertiary}; 
		color:${props => props.color.tertiary}; 
    padding: 3px 3px;
    border-radius: 20px;
		justify-content: left;
	}
	.stats.extended {
		flex-flow:column;
		border-radius:9px;
		padding: 5px 6px;
		width:auto;
	}
	.stats.extended .stat {
    color: #333;
		padding:0;
		margin:0;
	}
	.stats.extended .stat .icon {width:30px;}
	.icon, .icon svg {width:18px; height: auto; display:flex;}
	.icon {width:20px;}

	.effects {margin-top:10px; font-size:12px; width: 150px;}

	.bonuses {
    font-size: 9px;
    color: #bdbdbd;
    position: absolute;
    top: 144px;
    display: flex;
	}
	.bonuses .bonus {margin:0 3px;}

	/* Light Theme */
	${({ size }) => size === "small" && css`
		width:120px;
		height:120px;
		.imgBox {width:50px; height:50px;}
		.img {max-width:50px; max-height:50px;}
		.name {font-size:12px;}
  `}


`;
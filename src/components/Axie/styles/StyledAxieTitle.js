import styled from 'styled-components';
//CSS
export const StyledAxieTitle = styled.div`
	display:flex;
	align-items:left;
	flex-flow:column;

	.name { font-size: 12px; margin-right:5px; color: #949494;}
	.id {background: #8d65ff; padding: 2px 5px; border-radius: 5px; font-size: 10px; background: ${props => props.color}; color:white;}
	.title {margin-left:3px; background: #ff3d55; padding: 2px 5px; border-radius: 5px; font-size: 10px; color:white;}
	.idGroup {display: flex; align-items: center;}
	.nameGroup {display: flex; align-items: center;}
	.icon {width:16px; height:16px; margin-right:5px;}
	.stageText {color: #6f6f6f; font-size: 18px;}
	.block {display:flex; align-items: center;}
	.line {margin-bottom:5px;}
	.line1, .line2 {display:flex; align-items: center;}
	.line1 {justify-content:space-between;}
	.line2 {margin-top:5px;}
	/* axieOwner */
	.axieOwner {width: 55px; overflow: hidden; text-overflow: ellipsis;}
	svg {width:16px;}
`;
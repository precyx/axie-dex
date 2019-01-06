import styled, {css} from 'styled-components';

//CSS
export const StyledBreedingData = styled.div`
  position:relative; 
	margin-top: -10px;
	display:flex; 
	line-height: 140%; 
	flex-flow: column;
	text-align:center; 
	font-size:12px; 
	font-weight: 400; 
	color: #777;


  .xp {margin:0 5px;}
  .penXp {color: #a0a0a0; font-weight:normal; }


	/* hasPendingXp */
	${({ hasPendingXp }) => hasPendingXp && css`
	.penXp { font-size:color: #daaa1e; font-weight: bold;}
	`}
	/* hasEnoughXpPendingToBreed */
	${({ hasEnoughXpPendingToBreed }) => hasEnoughXpPendingToBreed && css`
		.penXp { color: #49bb2d; font-weight: bold;}
	`}
	/* hasEnoughXpAlreadyToBreed */
		${({ hasEnoughXpAlreadyToBreed }) => hasEnoughXpAlreadyToBreed && css`
		.penXp { color: #30b9e4; font-weight: bold;}
	`}
`;
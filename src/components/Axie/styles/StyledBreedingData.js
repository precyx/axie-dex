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
	color: #a2a2a2;

	.pre {white-space: pre;}
  .xp {margin:0 5px;}
  .penXp {font-weight:normal; }
	.breedCount {color: #a64ff0;}

	/* hasPendingXp */
	${({ hasPendingXp }) => hasPendingXp && css`
	.penXp .val {color: #de2e2e; font-weight: 800;}
	`}
	/* hasEnoughXpPendingToBreed */
	${({ hasEnoughXpPendingToBreed }) => hasEnoughXpPendingToBreed && css`
		.penXp .val {color: #49bb2d; font-weight: 800;}
	`}
	/* hasEnoughXpAlreadyToBreed */
	${({ hasEnoughXpAlreadyToBreed }) => hasEnoughXpAlreadyToBreed && css`
		.penXp .val {color: #1f9ed0; font-weight: 800;}
	`}
`;
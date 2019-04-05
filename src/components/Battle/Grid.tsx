
import React from "react";
import styled from "styled-components";

interface GridProps {
	activeTiles:Array<number>,
}

const StyledTile = styled.div`
	width:50px;
	height:50px;
	background:grey;

	    width: 50px;
    height: 50px;
    transform: rotate(-45deg);
    background: grey;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledGrid = styled.div`
	display:flex;
	width: 150px;
    display: flex;
    flex-flow: wrap;
    transform: rotate(45deg);
`;

export const Grid:React.FC<GridProps> = (props:GridProps) => {

	let counter = 0;
	return (
		<>
		<StyledGrid>
		{
			[1,1,1].map((a,i) => 
				[2,2,2].map((b,j) => {
					counter++;
					return <StyledTile key={j}>{counter}</StyledTile>
				}
			))
		}
		</StyledGrid>
		</>
	)
}
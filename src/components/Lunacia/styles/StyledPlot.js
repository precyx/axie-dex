import styled, {css} from 'styled-components';

//CSS
export const StyledPlot = styled.div.attrs({
	style: ({ x, y, plotSize, color }) => ({ 
		width: plotSize + 'px',
		height: plotSize + 'px',
		left: x,
		top: y,
		backgroundColor: color,
	})
})`

	position:absolute;


	/* x state */
	${({ x }) => x && css``}
`;
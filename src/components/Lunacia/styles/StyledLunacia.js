import styled, {css} from 'styled-components';

//CSS
export const StyledLunacia = styled.div`

	.mapGroup {display:flex;width:1050px; margin: 0 auto;}
	.count {color:grey; margin-left:5px;}

	.status {position:absolute; left:20px; top:20px; }
	.status .box {border:none; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25); }
	.mapContainer {position:relative; display:flex; width:${props => props.mapSize}; height:${props => props.mapSize}; margin:0 auto;}
	.map {width:100%; height:100%; }

	.plotCount {margin-top:20px; display:flex; justify-content:center; font-size:24px; color:grey;}


	.uniqueBuyers {margin-left:50px; width:350px;}
	.uniqueBuyers .list {height:500px; overflow-y:scroll; display:flex; flex-flow:column;}
	.uniqueBuyers .addr {font-size:12px; color:#666; margin-bottom:5px;}
	/* x state */
	${({ x }) => x && css``}
`;
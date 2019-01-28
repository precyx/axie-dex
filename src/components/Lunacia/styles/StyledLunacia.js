import styled, {css} from 'styled-components';

//CSS
export const StyledLunacia = styled.div`

	.mapGroup {display:flex;width:1050px; margin: 0 auto; position:relative; right:-210px;}
	.count {color:grey; margin-left:5px;}

	.status {position:absolute; z-index:100; left:20px; top:20px; }
	.status .box {border:none; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25); }
	.mapOuterContainer { cursor:grab;position:relative; width:602px; height:602px; overflow:hidden;}
	.mapOuterContainer:active {cursor: grabbing;}
	.mapContainer { position:absolute; left:0; top:0; display:flex; width:${props => props.mapSize}; height:${props => props.mapSize}; margin:0 auto;}
	.map {width:100%; height:100%; pointer-events:none; user-select:none;}
	.plot {pointer-events:none;}

	.plotCount {margin-top:20px; display:flex; justify-content:center; font-size:24px; color:grey;}

	.zoomButtons {position:absolute; right:15px; bottom:15px;}
	.zoomButtons .button {font-weight: bold; font-size: 20px; padding: 0; width: 40px; height: 40px; border-radius: 50%; margin-right: 5px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);}
	.zoomButtons .button:hover {opacity:1;}

	.uniqueBuyers {margin-left:50px; width:280px;}
	.uniqueBuyers .list {height:500px; overflow-y:scroll; display:flex; flex-flow:column;}
	.uniqueBuyers .addr {font-size: 10px; color: #969696; margin-bottom: 2px;}
	/* x state */
	${({ x }) => x && css``}
`;
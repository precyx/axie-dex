import styled, {css} from 'styled-components';

//CSS
export const StyledEvent = styled.div`

	background:white;
	/*box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18); */
	/* box-shadow:none; */
	/*border: 1px solid #dedede;
	border-radius: 8px;*/
	padding: 30px;
	margin-bottom: 30px;
	h2 {margin:0;}

	.params {}
	.events {max-height:400px; overflow-y:scroll; }
	.events .line { }

	.count {font-size: 14px; color: grey; margin-top: 20px; margin-bottom: 10px;}

	/* titleBar */
	.titleBar {display:flex; align-items:center; margin-bottom:20px;}
	.titleBar .tag {margin-left:15px; display: inline-flex; padding: 2px 5px; border-radius: 3px; color: white; font-size: 12px;}
	.event { background: #fba92a; }

	/* callBar */
	.callBar {display:flex; justify-content:flex-end; margin-top:10px;}
	.button { text-transform: none; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); border-radius: 6px; margin-left:5px;}

	/* x state */
	${({ x }) => x && css``}
`;
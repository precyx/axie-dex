import styled from 'styled-components';

//CSS
export const StyledMassSync = styled.div`
	font-family: "Roboto";
	position:relative;

	.headerBox {max-width: 1500px; margin:0 auto; display:flex; justify-content:space-between; align-items:baseline;}
	.titleBox {margin-top:20px; text-align: left; width:auto; }
	.axieList { position:relative; display: flex; flex-flow: wrap; max-width: 1500px; margin: 0 auto; margin-top: 10px; }
	.spinnerContainer {position:absolute; z-index: 200; background:rgba(255,255,255,0.8); width: 100%; 
		margin: 0 auto;  height: 100%; min-height:40vh; color: #a146ef; font-weight: normal; align-items: center; justify-content:center; display: flex; font-size: 12px; flex-flow: column;}
	.spinnerContainer .text {margin-top:10px;}
	.pageBar {display:inline-flex; align-items:center; margin-bottom:20px;}
	.pageBar .button {margin: 0 20px;}
	/* address bar */
	.addressBar {margin-bottom:20px; }
	/* top action bar */
	.topActionBar {display:flex; align-items:center; margin-bottom:20px; }
	/* info bar */
	.infoBar {display:flex; align-items:center; }
	/* start screen */
	.startScreen {position:absolute; z-index: 200; background:rgba(255,255,255,0.8); width: 100%; 
		margin: 0 auto;  height: 100%; min-height:40vh; align-items: center; justify-content:center; display: flex; flex-flow:column; }
	.startScreen .button { padding: 10px 15px; font-size: 14px; margin-left:20px;}
	.startScreen .bar { flex-flow: row; margin:10px 0; }
	.startScreen .textfield { justify-content:center; }

	/* successBox */
	.successBox .linkList {height:300px; overflow-y:scroll; height: 300px; overflow-y: scroll; background: #f9f9f9; padding: 15px}
	.successBox .linkList .link {font-size:14px; margin-bottom:5px; }
	.successBox .title {font-size: 28px; margin-bottom: 10px;}
	.successBox .subtitle {font-size: 18px; margin-bottom: 5px; margin-top:30px;}

	/* sync controller */
	.syncController {width:800px; }

	h1 {font-size: 38px; margin-bottom:0; margin-top:0; text-align:left;}
	h2 {margin:0;}
	h2.v2 {font-weight:normal; font-size:14px; color:#9e9e9e;}
	h3 {color: #9c9c9c; font-size: 18px; font-weight:400;} 
`;
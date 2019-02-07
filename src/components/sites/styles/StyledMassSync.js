import styled from 'styled-components';

//CSS
export const StyledMassSync = styled.div`
	font-family: "Roboto";
	position:relative;

	.headerBox {max-width: 1500px; margin:0 auto; display:flex; justify-content:space-between; align-items:baseline;}
	.titleBox {margin-top:20px; text-align: left; width:auto; display: flex; flex-flow: column; width:100%; }
	/* axieList */
	.axieList { position:relative; display: flex; flex-flow: wrap; max-width: 1500px; margin: 0 auto; margin-top: 10px; }
	.axieList .row {display:flex; }
	.spinnerContainer {position:absolute; z-index: 200; width: 100%; margin: 0 auto; height: 100%; min-height:calc(100vh - 320px); }
	.spinnerContainer {background:rgba(255,255,255,0.8); color: #a146ef;  font-weight: normal; font-size: 12px;  display: flex;  align-items: center;  justify-content:center;  flex-flow: column;}
	.spinnerContainer .text {margin-top:10px;}
	/* page bar */
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

	.axieCardOptions {display:flex; justify-content:center;}

	/* colelction */
	.ReactVirtualized__Grid__innerScrollContainer {display:flex; flex-flow:wrap;}
	.ReactVirtualized__Grid {outline:none;}

	/* sync controller */
	.syncController {width:600px; position:fixed; top: 100px; right:0; z-index:400;}

	h1 {font-size: 38px; margin-bottom:0; margin-top:0; text-align:left;}
	h2 {margin:0;}
	h2.v2 {font-weight:normal; font-size:14px; color:#9e9e9e;}
	h3 {color: #9c9c9c; font-size: 18px; font-weight:400;} 
`;
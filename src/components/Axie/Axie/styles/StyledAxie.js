
import styled, { css } from "styled-components";

//CSS
export const StyledAxie = styled.div`
  /* border: 1px solid #e2e2e2; */
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.06);
  padding: 15px;
  width: 220px;
  min-height:220px;
  margin: 7px;
  border-radius: 20px;
  background:white;
  position:relative;


  .axieTitleContainer {height:60px;}
  .axieContainer {display:flex; flex-flow:column; margin-bottom:5px;}
  .statContainer {display:flex; justify-content: space-between; margin-bottom:10px;}
  .moveContainer {display:flex; justify-content: space-between; margin-bottom:10px;}
  .axieTitleContainer { position: relative; z-index: 10;}
  .axieTitle { display: flex; justify-content: flex-start; margin-bottom:5px;}
  .axieTitle .axieOwner {display:none;}
  :hover .axieTitle .axieOwner {display:flex;}

  .axieContainer {}
  /* main container */
  .mainContainer {margin-top:0;}
  /* static img */
  .staticImg {width:220px; height:auto; margin-left:-15px;}
  canvas {display:block; margin-left:-15px;}
  .axieTitle {position: relative;}
  /* sales data */
  .salesData {text-align:center;}

  /* card controller */
  .cardController {display:none; width:40px; height:40px; border-radius:50%; background:#c3c3c3; cursor:pointer; position:absolute; right:10px; top: 35px; z-index:200;}
  :hover .cardController {display:block;}
  .controlBoard {position:absolute; display:flex; flex-flow:column; left:0; top:0; border-radius: 30px; padding:15px; width:100%; height:100%; background:rgba(255,255,255,0.7); z-index:100;}
  .controlBoard .btn {width:40px; height:40px; border-radius:50%; cursor:pointer; background:grey; margin-left:5px; margin-top:5px;}
  .controlBoard .line {display:flex; margin-top:15px;}

  /* auction data */
  ${({ auctionData }) => auctionData && css`
    .axieTitleContainer { position: relative; z-index: 10;}
  `}

  /* features */
  ${({ features }) => features === "minimal" && css`
    /*width:auto;*/
    /*.axieTitleContainer {height:60px;}*/
  `}

  ${({ features }) => features === "stats" && css`
    width:300px;
    .staticImg {margin:0 auto;}
    canvas {margin:0 auto;}
  `}

  /* size */
  ${({ size }) => size === "large" && css`
    margin:10px;
    width: 280px;
    border-radius:9px;
    .staticImg {width:280px;}
    canvas {width:280px!important; height:auto!important;}

    .axieTitle  .name {font-size:16px; margin:0;}
    .block.left {}
    .salesData .text {font-size:20px;}
  `}
  ${({ size, features }) => size === "large" && features === "stats" && css`
    width:350px;
  `}
  ${({ size }) => size === "small" && css`
    width:150px;
    padding:10px;
    min-height:160px;
    height:160px;
    .axieTitleContainer {height:20px;}
    .cardController {display:none!important;}
    .axieTitle .name, .axieTitle .id  {font-size:10px;}
    .breedingData {font-size:10px;}
    .staticImg, .axieContainer canvas {width:148px!important; height:auto!important; margin-left:-10px;}
    .salesData {margin-top:-15px;}
    .salesData .text {font-size:12px;}
    .nameGroup {display:none;}
  `}
  ${({ size }) => size === "tiny" && css`
    width:80px;
    padding:5px;
    min-height:auto;
    height:80px;
    border-radius:5px;
    margin:2px;
    .axieTitleContainer {height:auto;}
    .cardController {display:none!important;}
    .axieTitle .name {font-size:10px; margin:0;}
    .axieTitle .icon, .axieTitle .id  {display:none;}
    .axieTitle .title {display:none;}
		.breedingData .xpProgress {display:none;}
		.breedingData * {line-height:100%;}
		.breedingData .xp {font-size:10px;}
    .axieOwner  {display:none!important;}
    .staticImg, canvas {width:78px!important; height:auto!important; margin-left:-5px;}
    .salesData {display:none!important;}
  `}
	${({ size, features }) => size === "tiny" && features === "breeding" && css`
		height: 115px;
	`}
  ${({ background }) => background === "none" && css`
    box-shadow:none
    border:none;
    background:none;
  `}
  
`;
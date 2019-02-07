import styled, {css} from 'styled-components';

//CSS
export const StyledTier = styled.div`
	
	display:flex;

	position:relative;
	padding:40px;

	margin-bottom:20px;

	.tierName {
    user-select: none;
    font-weight: 900;
    font-style: italic;
    position: absolute;
    width: 140px;
    height: 100px;
    background: white;
    color: #333;
    font-size: 50px;
    display: flex;
    justify-content: left;
    align-items: center;
    border-radius: 200px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    display: flex;
    justify-content: center;
    align-items: center;
    top: -60px;
    left: -40px;
		padding-left:20px;
	}
	.partGroups {display:flex; flex-flow:row; background: none; padding:20px; border-radius:8px; margin-left: 115px; position: relative; min-width:150px; min-height:150px;}
	.partGroups .partTypeGroup { /*border-bottom: 1px solid rgba(0,0,0,0.05);*/  }
	.partGroups .partTypeGroup:last-child { border:none;}

	background: url(../img/patterns/circle_pattern6.png) repeat-x -5px bottom / 34px, linear-gradient(to bottom,#eaeaea 0%,#a5a5a5 100%);

	${({ tier }) => tier === "s" && css`
		.tierName {background:white; color:#fb1d77;}
		background: url(../img/patterns/circle_pattern6.png) repeat-x -5px bottom / 34px,  linear-gradient(to bottom,#ff7272b3 0%,#fb1ddf 100%);
	`}
	${({ tier }) => tier === "a" && css`
		.tierName {background:white; color:#ff6c23;}
	  background: url(../img/patterns/circle_pattern6.png) repeat-x -5px bottom / 34px, linear-gradient(to bottom,#ff9b3fba 0%,#ff3b3b 100%);
	`}
	${({ tier }) => tier === "b" && css`
		.tierName {background:white; color:#ffb62d;}
	  background: url(../img/patterns/circle_pattern6.png) repeat-x -5px bottom / 34px, linear-gradient(to bottom,#ffdf7f 0%,#ff7616 100%);
	`}

	
	@media only screen and (max-width: 600px) {

		.tierName { width: 210px; height: 90px; font-size:38px; padding-left: 26px; }
		.partGroups { margin-left: 59px; padding:20px;}
	}
`;
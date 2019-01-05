import styled, {css} from 'styled-components';

//CSS
export const StyledTier = styled.div`
	
	display:flex;
	margin-bottom:40px;
	position:relative;

	.tierName { user-select:none; margin-top:30px; font-weight: 900; font-style: italic; position:absolute; left:0; width:200px; height:150px; background:#e6e6e6; color:#333; font-size:60px; display:flex; justify-content:left; padding-left:50px; align-items:center; border-radius:200px;}
	.partGroups {display:flex; flex-flow:wrap; border:1px solid #d8d8d8; padding:30px; border-radius:8px; background:white; margin-left: 115px; position: relative; min-width:150px; min-height:150px;}
	.partGroups .partTypeGroup {margin-left:20px; }

	${({ tier }) => tier === "s" && css`
		.tierName {background:#ffdbdb; color:#db4545;}
	`}
	${({ tier }) => tier === "a" && css`
		.tierName {background:#ffeddb; color:#ee9245;}
	`}
	${({ tier }) => tier === "b" && css`
		.tierName {background:#fff6ba; color:#e4cc3f;}
	`}
`;
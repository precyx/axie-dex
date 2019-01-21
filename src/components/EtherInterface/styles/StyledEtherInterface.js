import styled, {css} from 'styled-components';

//CSS
export const StyledEtherInterface = styled.div`

	/*.radioButton {background:none;}
	.radioButton:hover {background: rgba(255, 192, 203, 0.3); border-bottom: 3px solid rgba(255, 192, 203, 0.3); border-radius: 3px 3px 0 0;}
	.radioButton.active {background:none; font-weight: 500; background: rgba(255, 192, 203, 0.3); border-bottom: 3px solid pink; color: rgba(0, 0, 0, 0.7);  border-radius: 3px 3px 0 0;}*/

	.mainContainer {width:1050px; margin:0 auto; position:relative; left:-135px; display:flex; justify-content:space-between;}
	.contractFilterContainer {width: 250px; margin-right:20px;}
	.contractContainer { width:800px; }

	.methods { background: white; padding: 20px; border-radius: 3px; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);}
	.methods .method { border-bottom: 1px solid #e2e2e2; border-radius:0;}

	/* x state */
	${({ layout }) => layout == "big" && css`
	
		.mainContainer { width:1500px; left:-135px; }

		.contractFilterContainer {width: 250px; margin-right:20px;}
		.contractContainer { width:1250px; }
	`}
`;
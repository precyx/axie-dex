import styled, {css} from 'styled-components';

//CSS
export const StyledAxieFilter = styled.div`

	.inputs {display:flex; align-items:center; justify-content:center;}
	.modal {    
		width: 920px;
    max-width: none;
	}

	.line {align-items: center; justify-content: center; display: flex;}
  .stageBar {display:flex; justify-content:center; margin-top:10px;}

	h2 {
		color: #ababab;
    font-weight: 400;
    font-size: 18px;
		cursor: pointer;
		padding: 10px 12px;
    border-radius: 6px;
	}

	h2:hover {
		color: #909090;
    background:#e0e0e0;
	}

	${({ x }) => x && css``}

`;
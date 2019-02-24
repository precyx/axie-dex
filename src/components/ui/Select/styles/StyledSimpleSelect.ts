import styled, {css} from "styled-components";


export const StyledSimpleSelect = styled.div`
	display:inline-flex; 
	flex-flow:column;
	align-items: baseline;
	position:relative;

	.button {
		display:inline-flex;
		cursor:pointer;
		user-select:none; 
		background:grey;
		border-radius:8px;
		padding:10px 15px;
		background:#e0e0e0;
		font-size:14px;
	}
	.button:hover {
		background:#d6d6d6;
	}
`;
import styled, {css} from 'styled-components';

export const StyledRadioButton = styled.div`
	display: inline-flex;
	padding:10px;
	background:rgba(0,0,0,0.1);
	border-radius:5px;
	color:#333;
	user-select:none;
	cursor:pointer;

	/* active */
  ${({ active }) => active && css`
    background:rgba(0,0,0,0.4);
  `}
`;
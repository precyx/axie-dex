import styled, {css} from 'styled-components';

export const StyledRadioGroup = styled.div`

  .radioButton {margin-right:5px;}
	/* active */
  ${({ active }) => active && css`
    
  `}
`;
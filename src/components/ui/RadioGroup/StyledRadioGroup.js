import styled, {css} from 'styled-components';

export const StyledRadioGroup = styled.div`
	/* active */
  ${({ active }) => active && css`
    
  `}
`;
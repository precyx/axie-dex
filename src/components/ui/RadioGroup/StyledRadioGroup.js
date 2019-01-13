import styled, {css} from 'styled-components';
import {red} from './utils/cssFunctions';

export const StyledRadioGroup = styled.div`

  .radioButton {margin-right:5px; font-weight:500; font-size:14px;}

  /* type */
  ${({ type }) => type == "modern" && css`
    .radioButton {background:none; font-size:14px; font-weight:500;}
    .radioButton:hover,
    .radioButton.active {
      background: rgba(255, 192,203,0.15);
      border-bottom: 3px solid rgba(255, 192,203,0.5);
      color: rgba(0,0,0,0.7);
      border-radius: 3px 3px 0 0;
    }
    .radioButton.active {
      background: rgba(255, 192,203,0.3);
      border-bottom: 3px solid pink;
      color: rgba(0,0,0,0.7);
      border-radius: 3px 3px 0 0;
      color: ${red};
    }
  `}

  ${({ type }) => type == "simple" && css`
    .radioButton { background:none;  }
    .radioButton:hover { background:rgba(0, 0, 0, 0.1); }
    .radioButton.active { color:red }
  `}


`;
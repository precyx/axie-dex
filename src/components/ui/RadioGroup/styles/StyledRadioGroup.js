import styled, {css} from 'styled-components';
import {red, hexToRgbA} from '../utils/cssFunctions';



export const StyledRadioGroup = styled.div`

  display:flex;
  align-items:center;

  .label {
    font-size: 14px;
    font-weight: bold;
    color: #8e8e8e;
    margin-right: 15px;
  }
  .radioButton {margin-right:5px; font-weight:normal; font-size:14px;}

  /* type */
  ${({ type }) => type == "modern" && css`
    .radioButton {background:none; font-size:14px; font-weight:normal; border-bottom: 3px solid rgba(0,0,0,0); }
    .radioButton:hover,
    .radioButton.active {
      background: ${props => hexToRgbA(props.color, 0.15)};
      border-bottom: 3px solid ${props => hexToRgbA(props.color, 0.5)};
      color: rgba(0,0,0,0.7);
      border-radius: 3px 3px 0 0;
      font-weight:500;
    }
    .radioButton.active {
      background: ${props => hexToRgbA(props.color, 0.24)};
      border-bottom: 3px solid ${props => props.color};
      color: rgba(0,0,0,0.7);
      border-radius: 3px 3px 0 0;
      color: ${props => props.color};
    }
  `}

  ${({ type }) => type == "simple" && css`
    .radioButton { background:none;  }
    .radioButton:hover { background:rgba(0, 0, 0, 0.1); }
    .radioButton.active { color:${props => props.color}; font-weight:500; }
  `}

    
  ${({ type }) => type == "background" && css`
    .radioButton { background:none;  }
    .radioButton:hover { background:rgba(0, 0, 0, 0.1); }
    .radioButton.active { color:${props => props.color}; background:${props => hexToRgbA(props.color, 0.23)}; font-weight:500; }
  `}

`;
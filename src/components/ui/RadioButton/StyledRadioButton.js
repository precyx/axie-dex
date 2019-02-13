import styled, {css} from 'styled-components';
import {hexToRgbA} from './utils/cssFunctions';

export const StyledRadioButton = styled.div`
	display: inline-flex;
	padding:10px;
	background:rgba(0,0,0,0.1);
	border-radius:5px;
	color:#333;
	user-select:none;
	cursor:pointer;
  font-size:14px;
  margin-right:5px;

	/* active */
  ${({ active }) => active && css`
    background:rgba(0,0,0,0.4);
  `}


  /* type */
  ${({ type }) => type == "modern" && css`
    background:none; 
    font-size:14px; 
    font-weight:normal; 
    border-bottom: 3px solid rgba(0,0,0,0);
    :hover, .active {
      background: ${props => hexToRgbA(props.color, 0.15)};
      border-bottom: 3px solid ${props => hexToRgbA(props.color, 0.5)};
      color: rgba(0,0,0,0.7);
      border-radius: 3px 3px 0 0;
      font-weight:500;
    }
    &.active {
      font-weight:500;
      background: ${props => hexToRgbA(props.color, 0.24)};
      border-bottom: 3px solid ${props => props.color};
      color: rgba(0,0,0,0.7);
      border-radius: 3px 3px 0 0;
      color: ${props => props.color};
    }
  `}

  ${({ type }) => type == "simple" && css`
    background:none;
    :hover { background:rgba(0, 0, 0, 0.1); }
    &.active { color:${props => props.color}; font-weight:500; }
  `}

  ${({ type }) => type == "background" && css`
    background:none;
    :hover { background:rgba(0, 0, 0, 0.1); }
    &.active { color:${props => props.color}; background:${props => hexToRgbA(props.color, 0.23)}; font-weight:500; }
  `}

  ${({ type }) => type == "chip" && css`
    margin-right:5px;
    margin-bottom:5px;
    background: rgba(0, 0, 0, 0.031); 
    border-radius: 50px; 
    border: 1px solid rgba(0, 0, 0, 0.11);
    :hover { background:rgba(0, 0, 0, 0.1); }
    &.active { 
      background: ${props => hexToRgbA(props.color, 0.14)};
      border:1px solid ${props => hexToRgbA(props.color, 0.5)};
      color: ${props => hexToRgbA(props.color, 0.9)};
      font-weight: 500;
    }
  `}

`;

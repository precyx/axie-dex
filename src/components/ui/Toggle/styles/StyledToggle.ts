import styled, {css, FlattenInterpolation} from 'styled-components';
import {ToggleButtonType, ToggleProps} from "../Toggle";
import {hexToRgbA} from "../../utils/color";

export const StyledToggle = styled.div<ToggleProps>`
	display: inline-flex;
	padding: 10px;
	font-size:14px;
	color: #333;
	user-select: none;
	cursor: pointer;
	margin-bottom: 5px;
	${({type, color}: ToggleProps) => getButtonStyle(type, color)}
`;

const getButtonStyle = (buttonType:ToggleButtonType | undefined, color:string | undefined) => {
	//
	switch(buttonType){
		case "chip" : 	
			return css`
				background: rgba(0,0,0,0.031);
				border-radius: 50px;
				border: 1px solid rgba(0,0,0,0.11);

				&:hover {
					background: rgba(0, 0, 0, 0.1);
				}

				&.active {
					color: #313131;
					font-weight: 500;
					background: #d6d6d6;
					border: 1px solid #848484;
					${color && `
						background: ${hexToRgbA(color, 0.14)};
						border:1px solid ${hexToRgbA(color, 0.5)};
						color: ${hexToRgbA(color, 0.9)};
					`}
				}
			`
		case "modern" : 
			return css`
				background:none; 
				font-size:14px; 
				font-weight:normal; 
				border-bottom: 3px solid rgba(0,0,0,0);

				&:hover, &.active {
					color: rgba(0,0,0,0.7);
					border-radius: 3px 3px 0 0;
					font-weight:500;
					background: #e6e6e6;
					border-bottom-color: #a5a5a5;

					${color && ` 
						background: ${hexToRgbA(color, 0.15)};
						border-bottom: 3px solid ${hexToRgbA(color, 0.5)}; 
					`}
				}
				&.active {
					font-weight:500;
					color: rgba(0,0,0,0.7);
					border-radius: 3px 3px 0 0;
					background: #d6d6d6;
					border-bottom-color: #3c3c3c;

					${color && ` 
						border-bottom: 3px solid ${color};
						color: ${color};
						background: ${hexToRgbA(color, 0.24)}; 
					`}
				}
		`
		case "simple" :
			return css`
				border-radius:5px;
				&:hover {
					background: rgba(0,0,0,0.1);
				}
				&.active {
					font-weight:500;
					${color && ` 
						color: ${color};
					`}
				}
		`
	}
	//return toggleButtonStyles[buttonType];
}


import styled from 'styled-components';
import {hexToRGB} from "../../../services/utils";

//CSS
export const StyledPartTypeGroup = styled.div`

	margin-bottom:20px;

	.parts {display:flex; flex-flow:wrap; align-items:end;}
	.label {user-select:none; text-transform: capitalize; font-weight: 500; margin-bottom:10px; display:inline-flex; color:#6d6d6d; border-radius:100px; padding: 5px 15px; font-size:22px; }

	.label { background: ${props => props.color.tertiary}; color:white; font-size: 14px; font-style:italic; }
`;
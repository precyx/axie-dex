import React from 'react';
import styled, {css} from "styled-components";

//CSS
const StyledStatusBox = styled.div`
	.box {background:white; color: #797979;font-size: 14px; width:300px; height: auto; padding:15px; border:1px solid #cecece; border-radius:8px;}

	${({ theme }) => theme == "dark" && css`
		.box {
				background: rgba(0, 0, 0, 0.85);
				color: rgba(255, 255, 255, 0.87);
			}
	`};
`;

/**
 * Renders {status_message} in a box
 * @class StatusBox
 * @example <StatusBox status={status}/>
 */
function StatusBox(props) {
	let theme = props.theme || "light";
	return (
		<StyledStatusBox className={"statusBox " + props.className} theme={theme}>
			<div className="box">{props.status.msg}</div>
		</StyledStatusBox>
	);
}

export default StatusBox;
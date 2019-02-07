import React from 'react';

import Button from "../ui/Button";
import Overlay from "../ui/Overlay/Overlay";
import Modal from "../ui/Modal/Modal";
//
import {StyledConfirmationBox} from "./styles/StyledConfirmationBox";

function ConfirmationBox(props) {

	const txLink = "https://etherscan.io/tx/" + props.syncTxHash;
	const selectedAxies = props.selectedAxies;
	const onClickOkSuccessBox = props.onClickOkSuccessBox;
	//
	return (
		<StyledConfirmationBox className="confirmation">
			<Overlay className="fullOverlay">
				<Modal className="box successBox">
					<div className="title">Exp Sync TX Sent</div>
					<div className="transaction">
						<a target="_blank" href={txLink}>View Sync TX on Etherscan</a>
					</div>
					<div className="subtitle">EXP Sync for {Object.keys(selectedAxies).length} Axies:</div>
					<div className="linkList">
						{Object.keys(selectedAxies).map(axieKey => 
							<div className="link" key={axieKey}>
								<a target="_blank" href={"https://axieinfinity.com/axie/" + selectedAxies[axieKey].id}>
									https://axieinfinity.com/axie/{selectedAxies[axieKey].id}
								</a>
							</div>
						)}
					</div>
					<div className="actionBar">
					<Button className="okButton" name="OK" type="filled" color="#a146ef" size="normal" onClick={onClickOkSuccessBox}/>
					</div>
				</Modal>
			</Overlay>
		</StyledConfirmationBox>
	);
}

export default ConfirmationBox;
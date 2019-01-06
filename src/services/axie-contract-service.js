
import Web3 from "web3";


export const checkpointForMulti = async (axieIds, expList, operator, owner, axieExpCheckpoint) => {
	const createdAtList = [];
	let signatures = '0x';

	for (var i = 0; i < axieIds.length; i++) {
		const createdAt = Date.now();

		const hash = window.web3.utils.soliditySha3(axieIds[i], expList[i], createdAt);
		const signature = await window.web3.eth.sign(hash, operator);

		createdAtList.push(createdAt);
		signatures += `01${signature.slice(2)}`;
	}

	return axieExpCheckpoint.checkpointForMulti(
		axieIds,
		expList,
		createdAtList,
		signatures,
		{ from: owner },
	);
};
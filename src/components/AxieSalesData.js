import React, { Component } from 'react';
import styled from 'styled-components';
// own
import {weiToEth} from '../services/utils';

//CSS
const StyledAxieSalesData = styled.div`
    font-size: 18px;
    color: #6f6f6f;
`;

class AxieSalesData extends React.PureComponent {
	constructor(props){
		super(props);
		//console.log("k", this.props.auctionData);
	}
	render() {

		if(this.props.auctionData){
			return (
				<StyledAxieSalesData>
					<div>{weiToEth(this.props.auctionData.buyNowPrice).toFixed(2)} ETH</div>
				</StyledAxieSalesData>
			);
		}
		else {
			return (
				<StyledAxieSalesData>
					<div>No Auction Data</div>
				</StyledAxieSalesData>
			);
		}


	}
}

export default AxieSalesData;
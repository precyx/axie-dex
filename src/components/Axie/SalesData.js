import React from 'react';
import styled from 'styled-components';
// own
import {weiToEth} from '../../services/utils';

//CSS
const StyledSalesData = styled.div`
		font-size: 18px;
    color: #585858;
`;
class SalesData extends React.PureComponent {
	render() {
		if(this.props.auctionData){
			const buyNowPrice = weiToEth(this.props.auctionData.buyNowPrice).toFixed(2);
			return (
				<StyledSalesData>
					<div className="text">{buyNowPrice} ETH</div>
				</StyledSalesData>
			);
		}
		else {
			return (
				<StyledSalesData>
					<div className="text">No Auction Data</div>
				</StyledSalesData>
			);
		}
	}
}
export default SalesData;
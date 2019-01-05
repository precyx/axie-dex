import React from 'react';
// own
import BasicCenterContainer from "../containers/BasicCenterContainer";
import AxieGallery from "../AxieGallery/AxieGallery";

import styled from 'styled-components';

//CSS
export const StyledXmasSkins = styled.div`
	.galleryGroup {margin-top:20px;}
`;

function XmasSkins(props){
	return (
		<BasicCenterContainer>
			<StyledXmasSkins>

			<h1>Xmas Skins</h1>
			<div className="galleryGroup">
				<AxieGallery api_version="v1" params={["part=mouth-rudolph"]} title="Rudolphs"/>
				<AxieGallery api_version="v1" params={["part=horn-spruce-spear"]} title="Spruce Spears"/>
				<AxieGallery api_version="v1" params={["part=tail-december-surprise"]} title="December Surprises"/>
				<AxieGallery api_version="v1" params={["part=back-candy-canes"]} title="Candy Canes"/>
				<AxieGallery api_version="v1" params={["part=eyes-snowflakes"]} title="Snowflakes"/>
				<AxieGallery api_version="v1" params={["part=ears-merry-lamb"]} title="Merry Lambs"/>
			</div>

			</StyledXmasSkins>
		</BasicCenterContainer>
		
	)
}


export default XmasSkins;
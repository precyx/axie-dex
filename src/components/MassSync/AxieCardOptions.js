import React, { Component } from 'react';

import RadioGroup from '../ui/RadioGroup/RadioGroup';

import {StyledAxieCardOptions} from './styles/StyledAxieCardOptions';

class AxieCardOptions extends React.PureComponent {
	render() {
		const features = this.props.features;
		const size = this.props.size;
		const onChangeFeatures = this.props.onChangeFeatures;
		const onChangeSize = this.props.onChangeSize;
		return (
			<StyledAxieCardOptions className={"axieCardOptions " + this.props.className}>
				<div className="group">
					<RadioGroup label="Features" type="modern" color="#b92a0d" class={"radiogroup"} options={[
						{label: "Stats", value: "stats"},
						{label: "Parts", value: "parts"},
						{label: "Breeding", value: "breeding"},
						{label: "Minimal", value: "minimal"},
					]} active_option={features} onChange={onChangeFeatures}>
					</RadioGroup>
				</div>
				<div className="group">
						<RadioGroup label="Size" type="modern" color="#01abd9" class={"radiogroup"} options={[
							{label: "Normal", value: "normal"},
							{label: "Large", value: "large"},
							{label: "Small", value: "small"},
							{label: "Tiny", value: "tiny"},
						]} active_option={"normal"} onChange={onChangeSize}>
						</RadioGroup>
					</div>
			</StyledAxieCardOptions>
		);
	}
}

export default AxieCardOptions;
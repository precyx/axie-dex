
import React from 'react';
//import styled from 'styled-components';
// own
import {StyledAxieFilter} from './styles/StyledAxieFilter';
import Textfield from '../ui/Textfield';
import Button from '../ui/Button';
import Modal from '../ui/Modal/Modal';
import Overlay from '../ui/Overlay/Overlay';
import RadioGroup from '../ui/RadioGroup/RadioGroup';

import TextField from '@material-ui/core/TextField';

class AxieFilter extends React.PureComponent{

	constructor(props){
		super(props);
		this.state={
			editMode: false,
		}
	}

	toggleEditMode = () => {
		this.setState(prevState=>({
			editMode: !prevState.editMode,
		}));
	}

	onClickSubmit = () => {
		this.toggleEditMode();
		this.props.onClickSubmit();
	}

	onChangeFilter = (filterName, val) => {
		//console.log("filter", name, e);
		this.props.onChangeFilter(filterName, val);
	}

	render(){
		const address = this.props.address;
		const page = this.props.page;
		const filters = this.props.filters;
		//
		const onChange = this.props.onChange;
		//
		const editMode = this.state.editMode;
		return (
			<StyledAxieFilter className="axieInput">

				{editMode ? (
					<div>
						<Overlay></Overlay>
						<Modal>
							<div className="inputs">
								<TextField label={"Address"} value={address} className="textfield address" variant="outlined" margin="dense" onChange={onChange("address")} />
								<TextField label={"Page"} value={page} className="textfield page" variant="outlined" margin="dense" onChange={onChange("page")} />
								<Button onClick={this.onClickSubmit} name={"Load Axies"} type="filled" color="#42a5ec"/>
								<Button onClick={this.toggleEditMode} name={"Cancel"} type="outline" color="#42a5ec"/>
							</div>
							<div className="line stageBar">
								<RadioGroup class={"radiogroup"} type="simple" label="Stage" options={[
									{label: "Adult", value: "4"},
									{label: "Petite", value: "3"},
									{label: "Larva", value: "2"},
								]} active_option={filters["stage"] || "4"} onChange={(e) => { this.onChangeFilter("stage", e) }}>
								</RadioGroup>
							</div>
							<div className="line mysticBar">
								<RadioGroup type="simple" color="#29a4f9" label="Mystics" options={[
									{label: "any", value: "any"},
									{label: "1", value: "1"},
									{label: "2", value: "2"},
									{label: "3", value: "3"},
									{label: "4", value: "4"},
									{label: "5", value: "5"},
									{label: "6", value: "6"},
								]} active_option={filters["num_mystic"] || "any"} onChange={(e) => { this.onChangeFilter("num_mystic", e) }}>
								</RadioGroup>
							</div>
							<div className="line purityBar">
								<RadioGroup type="simple" color="#ba9328" label="Pureness" options={[
									{label: "any", value: "any"},
									{label: "1", value: "1"},
									{label: "2", value: "2"},
									{label: "3", value: "3"},
									{label: "4", value: "4"},
									{label: "5", value: "5"},
									{label: "6", value: "6"},
								]} active_option={filters["pureness"] || "any"} onChange={(e) => { this.onChangeFilter("pureness", e) }}>
								</RadioGroup>
							</div>
							<div className="line classBar">
								<RadioGroup type="simple" color="#bb99dd" label="Class" options={[
									{label: "any", value: "null"},
									{label: "Beast", value: "beast"},
									{label: "Aquatic", value: "aquatic"},
									{label: "Plant", value: "plant"},
									{label: "Bird", value: "bird"},
									{label: "Bug", value: "bug"},
									{label: "Reptile", value: "reptile"},
									{label: "Moon", value: "hidden_3"},
									{label: "Star", value: "hidden_2"},
									{label: "Nut", value: "hidden_1"},
								]} active_option={filters["class"] || "null"} onChange={(e) => { this.onChangeFilter("class", e) }}>
								</RadioGroup>
							</div>
							<div className="line tagBar">
								<RadioGroup type="simple" color="#08dba8" label="Tag" options={[
									{label: "none", value: "null"},
									{label: "Origin", value: "origin"},
									{label: "MEO", value: "meo"},
								]} active_option={filters["class"] || "null"} onChange={(e) => { this.onChangeFilter("class", e) }}>
								</RadioGroup>
							</div>
						</Modal>
					</div>
				)
				:(
					<h2 onClick={this.toggleEditMode}>{address}</h2> 
				)}
			
			</StyledAxieFilter>
		);
	}

}

export default AxieFilter;





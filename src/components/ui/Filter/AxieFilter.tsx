import React from "react";

import RadioGroup from '../ui/../RadioGroup/RadioGroup';
import RadioButton from '../ui/../RadioButton/RadioButton';
import {SimpleSelect, ListOption} from '../ui/../Select/SimpleSelect';
import ExpansionPanel from '../ui/../ExpansionPanel/ExpansionPanel';
import {Select2} from '../Select/Select2';
import {Toggle, ToggleButtonType} from "../Toggle/Toggle";
import {StyledToggleBase} from "../Toggle/ToggleBase";
import Button from '../../ui/Button';
import {TextField} from '../../ui/TextField/TextField';
import {Icon} from "../Icon/Icon";

import {bodyparts} from "../../../data/axie-body-parts";

import styled, {css} from "styled-components";


const StyledAxieFilter:any = styled.div`
  background: white; z-index:100; width:410px; padding: 20px; box-shadow: 0 2px 2px #0000002e; border-radius: 10px; position:absolute; left:0; top:20px;}
	.headbar {display:flex; justify-content:space-between; border-bottom: 1px solid rgba(0, 0, 0, 0.1); }
	.headbar > .radiogroup {border:none;}
	.radiogroup { flex-flow: wrap; border-bottom: 1px solid rgba(0, 0, 0, 0.1); padding: 8px 0; }

	.loadDataButton {
		position: absolute;
		top: 55px;
    right: -80px;
    border-radius: 50px;
    background: #55adfb;
    border: none;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    box-shadow: 0 1px 7px rgba(0, 0, 0, 0.2);
	}
	.loadDataButton:hover {
		background:#6ca6ff;
	}

	.tfield {margin-top:10px;}
`;

enum FilterViewMode {
  Axie = "axie",
  Genes = "genes",
  User = "user"
}

enum FilterType {
  Color = "color",
  Class = "class",
  Stage = "stage",
  Pattern = "pattern",
  Pureness = "pureness",
  Title = "title",
  Auction = "auction",
  Owner = "owner",
}

enum PartType {
  Eyes = "eyes",
  Ears = "ears",
  Mouth = "mouth",
  Horn = "horn",
  Back = "back",
  Tail = "tail",
}


interface Filter {
  [filtername:string] : string,
}

interface GeneFilter {
  [filtername:string] : string
}

/*
interface Filter {
  color:string,
  class:string,
  stage:string,
  pattern:string,
  pureness:string,
  tag:string,
}

interface GeneFilter {
  eyes:string,
  ears:string,
  mouth:string,
  horn:string,
  back:string,
  tail:string,
}*/

interface AxieFilterProps {
  onLoadData?(filter:Filter, geneFilter:Filter, sorting:string):Function,
  onChangeFilter?(filter:Filter):any,
  onChangeGeneFilter?(filter:Filter):any,
  onChangeSorting?(sorting:string):any,
}

interface AxieFilterState{
  viewMode:FilterViewMode,
  filter:Filter,
  geneFilter:Filter,
  sorting: string,
  address: string,
}


const ColorDrop = styled(StyledToggleBase)`
	padding:0;
	margin:0;

	width:30px;
	height:30px;
	background:grey;
	border-radius:50%;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.14);

	&:hover {
		opacity:0.75;
	}

	${props => props.isOn && `
		& {
			border:3px solid white;
			box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
		}
	`}

	${props => props.color && `
		& {
			background: ${props.color}
		}
	`}

`;


const axieClasses = [
 "beast", "plant", "aquatic", "reptile", "bug", "bird", "hidden_1", "hidden_2", "hidden_3"
];

const axieClassColors:{[key:string]:string} = {
	"aquatic"   : "#00B8CF",
	"beast"     : "#FFB70F",
	"plant"     : "#6BBF00",
	"bird"      : "#FF8ABC",
	"bug"       : "#FF5241",
	"reptile"   : "#A979F8",
	"hidden_1"  : "#c6bcd4",
	"hidden_2"  : "#beceff",
	"hidden_3"  : "#369ab7",
}

const axieStages:{[key:string]:number} = {
	"egg" : 1,
	"petite" : 3,
	"adult" : 4,
}

const StyledClassIcon:any = styled(StyledToggleBase)`
	display:flex;
	justify-content:center;
	align-items:center;

	border-radius:50%;

	width:30px;
	height:30px;

	background:white;

	&:hover {
		background:#eaeaea;
	}

	${props => props.color && `
		& {
			svg {fill: ${props.color}!important }
		}
	`}

	${props => props.isOn && `
		${props.color && `
			&& {
				background: ${props.color};
				svg {fill: white!important; }
			}
		`}
	`}
`;


const ClassIcon = (props:any) => (
	<Icon src={"./img/icons/classes/" + props.class + "_24px.svg"} size={22}/>
);


const Label = styled.div`
	font-size: 14px;
	font-weight: bold;
	color: #8e8e8e;
	margin-right: 15px;
`;

const Row = styled.div`
		display:flex;
		align-items:center;
		border-bottom: 1px solid rgba(0,0,0,0.1);
    padding: 15px 0;
`;


const body_colors:{[key:string]:string} = {
	white: 			"ffffff",
	black: 			"7a6767",
	orange: 		"ffa12a",
	yellow: 		"ffec51",
	dirt: 			"f0c66e",
	
	blue: 			"759edb",
	sky_blue: 	"2de8f2",
	cyan: 			"4cffdf",

	lime: 			"ccef5e",
	grass:			"c5ffd9",
	kiwi:				"efd636",

	purple: 		"ef93ff",
	candy: 			"fdbcff",
	dream: 			"f5e1ff",

	red: 				"f74e4e",
	straw: 			"ff6d61",
	bug: 				"ff7183",

	pink: 			"ffb4bb",
	pillow:			"ff778e",
	fantasy:		"ff9ab8",

	mist: 			"c0fcfe",
	star: 			"fefda0",
	wonder: 		"d7ccfe",

	grey: 			"d0dada",
	rust: 			"d4a69e",
	coal: 			"93828a",

	abyss: 			"389ec6",
	swamp: 			"62c5c3",
	dust: 			"60afce",

	toxic: 			"43e27d",
}


export class AxieFilter extends React.PureComponent<AxieFilterProps, AxieFilterState>{

  constructor(props:AxieFilterProps){
    super(props);
    this.state = {
      viewMode: FilterViewMode.Axie,
      filter: {},
      geneFilter: {},
			sorting : "",
			address: "",
    }
  }

  
	onChangeFilter = (filterType:FilterType, option:string) =>{
		console.log("change filter", filterType, option);
		let newFilter = Object.assign({}, this.state.filter);
		if(this.state.filter[filterType] == option) delete newFilter[filterType];
		else newFilter[filterType] = option;
		this.setState({
			filter: newFilter,
		}, () => { 
      console.log("filter", this.state.filter) 
      if(this.props.onChangeFilter) this.props.onChangeFilter(this.state.filter);
    }) 
	}

	onChangeGeneFilter = (partType:PartType, option:string) => {
		
		let newGeneFilter = Object.assign({}, this.state.geneFilter);
		if(newGeneFilter[partType] && newGeneFilter[partType] == option) delete newGeneFilter[partType];
		else newGeneFilter[partType] = option;

		this.setState({
			geneFilter: newGeneFilter,
		}, () => {
      console.log("change gene filter", this.state.geneFilter);
      if(this.props.onChangeGeneFilter) this.props.onChangeGeneFilter(this.state.geneFilter);
		})
	}

	onSelectOption = (option:{[V:string]:string}) => {
		this.setState({
			sorting: option.value,
		}, () => {
      if(this.props.onChangeSorting) this.props.onChangeSorting(this.state.sorting);
    })
	}

	handleChangeViewMode = (viewMode:FilterViewMode) => {
		this.setState({ viewMode: viewMode })
  }
  
  handleClickLoadButton = () => {
    if(this.props.onLoadData) this.props.onLoadData(
      this.state.filter,
      this.state.geneFilter, 
			this.state.sorting,
    );
	}
	
	handleChangeAddress = (value:string) => {
		this.setState({ address: value}, () => {

		});
	}
  
	renderAxieFilter = () => {
		const viewMode:FilterViewMode = this.state.viewMode;
		const filter:Filter | undefined = this.state.filter;
		const geneFilter:Filter | undefined = this.state.geneFilter;

		//const axieBodyParts = bodyparts.map(part => ({label: part.name, value: part.id}));
		const bodyPartsByType:{[key:string]:any} = {};
		["eyes", "ears", "mouth", "horn", "back", "tail"].forEach(partType => {
			bodyPartsByType[partType] = bodyparts
				.filter(part => part.type == partType)
				.map(part => ({label: part.name, value: part.id}));
		})
		console.log("xd", bodyPartsByType);
		return (

				<React.Fragment>
					
				<div className="headbar">
					<RadioGroup className="filterSwitch" class={"radiogroup"} color="#f346cc" type="modern" options={[
						{label: "Axie", value: "axie"},
						{label: "Genes", value: "genes"},
						{label: "User", value: "user"},
					]} active_option={"axie"} onChange={this.handleChangeViewMode}>
					</RadioGroup>

					<SimpleSelect options={[
						{label: "Lowest ID first", value: "id_asc"},
						{label: "Highest ID first", value: "id_desc"},
						{label: "Cheapest first", value: "price_asc"},
						{label: "Most expensive first", value: "price_desc"},
					]} onSelectOption={this.onSelectOption}>
					</SimpleSelect>
				</div>

				{viewMode == FilterViewMode.Axie && (
					<React.Fragment>



						 
						<Row>
							<Label>Color</Label>
							<Select2 deselect={true} options={[ filter["color"] ]} onChange={(options:[]) => { this.onChangeFilter(FilterType.Color, Object.keys(options)[0] || "") } }>
								{Object.keys(body_colors).map(colorKey => 
									<Toggle value={body_colors[colorKey]} CustomComponent={ColorDrop} color={"#"+body_colors[colorKey]} style={{marginRight: "5px", marginBottom: "5px"}}/>
									)}
							</Select2>
						</Row>
						
						<Row>
							<Label>Class</Label>
							<Select2 deselect={true} options={[ filter["class"] ]} onChange={(options:[]) => { this.onChangeFilter(FilterType.Class, Object.keys(options)[0] || "") } }>
								{axieClasses.map(axieClass => (
									<Toggle value={axieClass} CustomComponent={ StyledClassIcon } color={axieClassColors[axieClass]} style={{marginRight: "5px", marginBottom: "5px"}}>
										<ClassIcon className="classIcon" class={axieClass}/>
									</Toggle>
								))}
							</Select2>
						</Row>

						<Row>
							<Label>Stage</Label>
							<Select2 deselect={true} options={[ filter["stage"] ]} onChange={(options:[]) => { this.onChangeFilter(FilterType.Stage, Object.keys(options)[0] || "") } }>
								{["egg", "petite", "adult"].map(axieStage => (
									<Toggle value={axieStages[axieStage].toString()} type={ToggleButtonType.Radio} color={"#ff00aa"} style={{marginRight: "5px", marginBottom: "5px"}}>
										{axieStage}
									</Toggle>
								))}
							</Select2>
						</Row>
						<RadioGroup enableDeselect={true} label="pattern" class={"radiogroup"} color="#a146ef" type="modern" options={[
							{label: "fluffy", value: "000001"},
							{label: "big yak", value: "110001"},
							{label: "wetdog", value: "100001"},
							{label: "sumo", value: "100010"},
							{label: "curly", value: "011110"},
							{label: "spikey", value: "011101"},
							{label: "trispike", value: "000011"},
						]} active_option={filter["pattern"] || "zero"} onChange={(option:string) => { this.onChangeFilter(FilterType.Pattern, option) }}>
						</RadioGroup>
						<RadioGroup enableDeselect={true} label="pureness" class={"radiogroup"} color="#a146ef" type="modern" options={[
							{label: "1", value: "1"},
							{label: "2", value: "2"},
							{label: "3", value: "3"},
							{label: "4", value: "4"},
							{label: "5", value: "5"},
							{label: "6", value: "6"},
						]} active_option={filter["pureness"] || "zero"} onChange={(option:string) => { this.onChangeFilter(FilterType.Pureness, option) }}>
						</RadioGroup>
						<RadioGroup enableDeselect={true} label="tag" class={"radiogroup"} color="#a146ef" type="modern" options={[
							{label: "Origin", value: "Origin"},
							{label: "MEO I", value: "MEO Corp"},
							{label: "MEO II", value: "MEO Corp II"},
							{label: "Agamogenesis", value: "Agamogenesis"},
						]} active_option={filter["title"] || "zero"} onChange={(option:string) => { this.onChangeFilter(FilterType.Title, option) }}>
						</RadioGroup>

						<Row>
							<Label>Auction</Label>
							<Select2 deselect={true} options={[ filter["auction"] ]} onChange={(options:[]) => { this.onChangeFilter(FilterType.Auction, Object.keys(options)[0] || "") } }>
								{["sale", "siring"].map(auctionType => (
									<Toggle value={auctionType} type={ToggleButtonType.Radio} color={"#ff00aa"} style={{marginRight: "5px", marginBottom: "5px"}}>
										{auctionType}
									</Toggle>
								))}
							</Select2>
						</Row>
						
						{this.renderLoadButton()}
					
					</React.Fragment>)
				}	


				{viewMode == FilterViewMode.Genes &&
					<React.Fragment>
						{/*<Select multiple type="chip" color="#b8a9b7" options={axieBodyParts} active={geneFilter} onChange={this.onChangeGeneFilter }/>*/}

						{Object.keys(bodyPartsByType).map((partTypeKey, i) => {
							return (
									<div className="partGroup" key={i}>

										<ExpansionPanel 
											label={
												<React.Fragment>
													<div className="label">{partTypeKey} <p className="count">{bodyPartsByType[partTypeKey].length}</p></div>
													
												</React.Fragment>
											} 
											closedContent={
												<>
													{geneFilter[partTypeKey] && 
														<RadioButton type="chip" active={true}>
															{geneFilter[partTypeKey]}
														</RadioButton> 
													}
												</>
											}
											content={
												<div className="parts">
													<RadioGroup 
														enableDeselect={true}
														type="chip"
														color="#a146ef"
														options={bodyPartsByType[partTypeKey]} 
														active_option={geneFilter[partTypeKey] || ""} 
														onChange={(option:string) => {this.onChangeGeneFilter(partTypeKey as PartType, option)} }
													/>
												</div>
											}
										/>
										
									</div>
								)
							}
						)}
						{this.renderLoadButton()}
					</React.Fragment>
        }
        
				{viewMode == FilterViewMode.User &&
					<>
						<TextField
							className="tfield" 
							label="address"
							value={this.state.filter[FilterType.Owner]}
							onChange={(value:string) => { this.onChangeFilter(FilterType.Owner, value) }}
							/>
							{this.renderLoadButton()}
					</>
        }

				</React.Fragment>
				);
			}
			

			renderLoadButton = () => {
				return <Button className="loadDataButton" onClick={this.handleClickLoadButton} name={"Get Axies"} />
			}
      
  render(){
    return <StyledAxieFilter>
      {this.renderAxieFilter()}
    </StyledAxieFilter> 
    
  }
}
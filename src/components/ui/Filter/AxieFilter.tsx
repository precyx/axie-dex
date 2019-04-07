import React from "react";

import RadioGroup from '../ui/../RadioGroup/RadioGroup';
import RadioButton from '../ui/../RadioButton/RadioButton';
import {SimpleSelect, StyledOption} from '../ui/../Select/SimpleSelect';
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
	background: white; 
	z-index:100; 
	position:relative;

	border-right: 1px solid rgba(0,0,0,0.1);
	border-bottom: 1px solid rgba(0,0,0,0.1);
	border-radius: 0 0 20px 0;
	
	.headbar {display:flex; justify-content:space-between; border-bottom: 1px solid rgba(0, 0, 0, 0.1);      align-items: center;   padding: 10px 15px;}
	.headbar > .radiogroup {border:none;}
	.radiogroup { flex-flow: wrap; border-bottom: 1px solid rgba(0, 0, 0, 0.1); padding: 8px 0; }

	.partGroup{
		padding: 0 20px;
		&:last-child {
			border:0;
		}
	}

	.loadDataButton {
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

	.tfield {
		margin-top:10px;
		padding: 0 20px;
	}
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
  Breeding = "breeding",
  Mystics = "mystics",
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
  [partTypeKey:string] : {
		gene_range?: string[],
		part?:string,
	}
}

interface AxieFilterProps {
  onLoadData?(filter:Filter, geneFilter:GeneFilter, sorting:string):Function,
  onChangeFilter?(filter:Filter):any,
  onChangeGeneFilter?(filter:GeneFilter):any,
  onChangeSorting?(sorting:string):any,
}

interface AxieFilterState{
  viewMode:FilterViewMode,
  filter:Filter,
  geneFilter:GeneFilter,
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

const axieClassColors:{[classType:string]:string} = {
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

const FlexWrap = styled.div`
	display:flex;
	flex-flow:wrap;
`;


const Label = styled.div`
	flex:1;
	font-size: 14px;
	font-weight: bold;
	color: #8e8e8e;
	margin-right: 15px;
`;

const Row = styled.div`
	display:flex;
	align-items:center;
	border-bottom: 1px solid rgba(0,0,0,0.1);
	padding: 10px 0;
	margin-left: 20px;

	&:last-child {
		border:0;
	}

	.ui-select {
		flex:4; 
		margin-bottom: -5px;
	}
`;

const FlexCenter = styled.div`
	display:flex;
	align-items:center;
`;

const GeneVal = styled.div`
	background: #a146ef;
	margin-left: 5px;
	color: white;
	width: 25px;
	height: 18px;
	display: flex;
	border-radius: 25px;
	font-size: 12px;
	align-items: center;
	justify-content: center;
`;

const StyledExpansionPanel = styled.div`
	
	color:grey;
	&:hover .panel-label .label {
		color:#333;
	}
	.panel-closed-content {
		display:flex;
		align-items:center;
	}
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

const patterns:{[key:string]:string} = {
	"000001" : "Fluffy",
	"110001" : "Big Yak",
	"100001" : "Wetdog",
	"100010" : "Sumo",
	"011110" : "Curly",
	"011101" : "Spikey",
	"000011" : "Trispike",
}

const tags:{[key:string]:string} = {
	"Origin" : "Origin",
	"MEO Corp" : "MEO I",
	"MEO Corp II" : "MEO II",
	"Agamogenesis" : "Agamogenesis",
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

	onChangeGeneFilter = (partType:PartType, part:string) => {
		console.log("yui", partType, part);
		
		let newGeneFilter:GeneFilter = Object.assign({}, this.state.geneFilter);
		if(!newGeneFilter[partType]) newGeneFilter[partType] = {};

		if(!part) newGeneFilter[partType].part = "";
		else newGeneFilter[partType].part = part;

		this.setState({
			geneFilter: newGeneFilter,
		}, () => {
      console.log("change gene filter", this.state.geneFilter);
      if(this.props.onChangeGeneFilter) this.props.onChangeGeneFilter(this.state.geneFilter);
		})
	}

	onChangeGeneRecessiveOptions = (partType:PartType, recessive_options:string[]) =>{

		let newGeneFilter:GeneFilter = Object.assign({}, this.state.geneFilter);
		if(!newGeneFilter[partType]) newGeneFilter[partType] = {};
		newGeneFilter[partType]["gene_range"] = recessive_options;

		this.setState({
			geneFilter: newGeneFilter,
		}, () => {
      console.log("change gene filter", this.state.geneFilter);
      if(this.props.onChangeGeneFilter) this.props.onChangeGeneFilter(this.state.geneFilter);
		})
	}

	onSelectOption = (option:any) => {
		console.log("oop", option);
		this.setState({
			sorting: option,
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
		const {viewMode, filter, geneFilter, sorting} = this.state;

		//const axieBodyParts = bodyparts.map(part => ({label: part.name, value: part.id}));
		const bodyPartsByType:{[partTypeKey:string]:Array<{label:string, value:string, mystic:boolean, class:string}> } = {};
		["eyes", "ears", "mouth", "horn", "back", "tail"].forEach(partType => {
			bodyPartsByType[partType] = bodyparts
				.filter(part => part.type == partType)
				.map(part => ({
					label: part.name, 
					value: part.id,
					mystic: part.mystic,
					class: part.class,
				}));
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

					<SimpleSelect options={[sorting]} deselect={true} onChangeOption={(options:any) => {this.onSelectOption(Object.keys(options)[0]) } }>
						<Toggle value="id_asc" label="lowest ID" CustomComponent={StyledOption}/>
						<Toggle value="id_desc" label="Highest ID" CustomComponent={StyledOption}/>
						<Toggle value="price_asc" label="Lowest Price" CustomComponent={StyledOption}/>
						<Toggle value="price_desc" label="Highest Price" CustomComponent={StyledOption}/>
					</SimpleSelect>

					{this.renderLoadButton()}
				</div>

				{viewMode == FilterViewMode.Axie && (
					<React.Fragment>


						
						<Row>
							<Label>Class</Label>
							<Select2 CustomComponent={FlexWrap} deselect={true} options={[ filter["class"] ]} onChange={(options:{}) => { this.onChangeFilter(FilterType.Class, Object.keys(options)[0] || "") } }>
								{axieClasses.map(axieClass => (
									<Toggle value={axieClass} CustomComponent={ StyledClassIcon } color={axieClassColors[axieClass]} style={{marginRight: "5px", marginBottom: "5px"}}>
										<ClassIcon className="classIcon" class={axieClass}/>
									</Toggle>
								))}
							</Select2>
						</Row>

						<Row>
							<Label>Color</Label>
							<Select2 CustomComponent={FlexWrap} deselect={true} options={[ filter["color"] ]} onChange={(options:{}) => { this.onChangeFilter(FilterType.Color, Object.keys(options)[0] || "") } }>
								{Object.keys(body_colors).map(colorKey => 
									<Toggle value={body_colors[colorKey]} CustomComponent={ColorDrop} color={"#"+body_colors[colorKey]} style={{marginRight: "5px", marginBottom: "5px"}}/>
									)}
							</Select2>
						</Row>

						<Row>
							<Label>Stage</Label>
							<Select2 CustomComponent={FlexWrap} deselect={true} options={[ filter["stage"] ]} onChange={(options:{}) => { this.onChangeFilter(FilterType.Stage, Object.keys(options)[0] || "") } }>
								{["egg", "petite", "adult"].map(axieStage => (
									<Toggle value={axieStages[axieStage].toString()} type={ToggleButtonType.Radio} color={"#ff00aa"} style={{marginRight: "5px", marginBottom: "5px"}}>
										{axieStage}
									</Toggle>
								))}
							</Select2>
						</Row>

						<Row>
							<Label>Pattern</Label>
							<Select2 CustomComponent={FlexWrap} deselect={true} options={[ filter["pattern"] ]} onChange={(options:{}) => { this.onChangeFilter(FilterType.Pattern, Object.keys(options)[0] || "") } }>
								{Object.keys(patterns).map((patternKey, i) => (
									<Toggle key={i} value={patternKey} color="#ff00aa" type={ToggleButtonType.Modern} style={{marginRight: "5px", marginBottom: "5px"}}>
										{patterns[patternKey]}
									</Toggle>
								))}
							</Select2>
						</Row>

						<Row>
							<Label>Pureness</Label>
							<Select2 CustomComponent={FlexWrap} deselect={true} options={[ filter["pureness"] ]} onChange={(options:{}) => { this.onChangeFilter(FilterType.Pureness, Object.keys(options)[0] || "") } }>
								{["1","2","3","4","5","6"].map((pureness, i) => (
									<Toggle key={i} value={pureness} color="#ff00aa" type={ToggleButtonType.Modern} style={{marginRight: "5px", marginBottom: "5px"}}>
										{pureness}
									</Toggle>
								))}
							</Select2>
						</Row>
						<Row>
							<Label>Mystics</Label>
							<Select2 CustomComponent={FlexWrap} deselect={true} options={[ filter["mystics"] ]} onChange={(options:{}) => { this.onChangeFilter(FilterType.Mystics, Object.keys(options)[0] || "") } }>
								{["1","2","3","4","5","6"].map((mystics, i) => (
									<Toggle key={i} value={mystics} color="#ff00aa" type={ToggleButtonType.Modern} style={{marginRight: "5px", marginBottom: "5px"}}>
										{mystics}
									</Toggle>
								))}
							</Select2>
						</Row>

						<Row>
							<Label>Tag</Label>
							<Select2 CustomComponent={FlexWrap} deselect={true} options={[ filter["title"] ]} onChange={(options:{}) => { this.onChangeFilter(FilterType.Title, Object.keys(options)[0] || "") } }>
								{Object.keys(tags).map((tagKey, i) => (
									<Toggle key={i} value={tagKey} color="#ff00aa" type={ToggleButtonType.Modern} style={{marginRight: "5px", marginBottom: "5px"}}>
										{tags[tagKey]}
									</Toggle>
								))}
							</Select2>
						</Row>

						<Row>
							<Label>Auction</Label>
							<Select2 deselect={true} options={[ filter["auction"] ]} onChange={(options:{}) => { this.onChangeFilter(FilterType.Auction, Object.keys(options)[0] || "") } }>
								{["sale", "siring"].map(auctionType => (
									<Toggle value={auctionType} type={ToggleButtonType.Radio} color={"#ff00aa"} style={{marginRight: "5px", marginBottom: "5px"}}>
										{auctionType}
									</Toggle>
								))}
							</Select2>
						</Row>

						<Row>
							<Label>Breeding</Label>
							<Select2 deselect={true} options={[ filter["breeding"] ]} onChange={(options:{}) => { this.onChangeFilter(FilterType.Breeding, Object.keys(options)[0] || "") } }>
								{["breedable"].map(breedingType => (
									<Toggle value={breedingType} type={ToggleButtonType.Checkbox} color={"#ff00aa"} style={{marginRight: "5px", marginBottom: "5px"}}>
										{breedingType}
									</Toggle>
								))}
							</Select2>
						</Row>


						

					</React.Fragment>)
				}	


				{viewMode == FilterViewMode.Genes &&
					<React.Fragment>
						{/*<Select multiple type="chip" color="#b8a9b7" options={axieBodyParts} active={geneFilter} onChange={this.onChangeGeneFilter }/>*/}

						{Object.keys(bodyPartsByType).map((partTypeKey:string, i:number) => {
							return (
									<div className="partGroup" key={i}>

										<ExpansionPanel
											CustomComponent={StyledExpansionPanel}
											label={
												<React.Fragment>
													<div className="label">{partTypeKey} <p className="count">{Object.keys(bodyPartsByType[partTypeKey]).length}</p></div>
												</React.Fragment>
											} 
											closedContent={
												<>
													{geneFilter[partTypeKey] && geneFilter[partTypeKey]["part"] && 
														<Toggle disabled type={ToggleButtonType.Chip} isOn={true}>

															{geneFilter[partTypeKey]["part"]}

															{geneFilter[partTypeKey] &&
																geneFilter[partTypeKey]["gene_range"] &&
																geneFilter[partTypeKey]["gene_range"]!.map(geneVal => 
																<GeneVal>{geneVal.toUpperCase()}</GeneVal>
															)}

														</Toggle> 
													}
												</>
											}
											content={
												<>
												<div className="recessive_options">
													<Select2  multiselect={true} options={ geneFilter[partTypeKey] && geneFilter[partTypeKey]["gene_range"] || [] }
														onChange={ (options:{[key:string]:string} ) => {this.onChangeGeneRecessiveOptions(partTypeKey as PartType, Object.keys(options)) } }
													>
														<Toggle value="d" type={ToggleButtonType.Checkbox} color="#ff00aa">D</Toggle>
														<Toggle value="r1" type={ToggleButtonType.Checkbox} color="#ff00aa">R1</Toggle>
														<Toggle value="r2" type={ToggleButtonType.Checkbox} color="#ff00aa">R2</Toggle>
													</Select2>
												</div>
												<div className="parts">
													<Select2 options={[ geneFilter[partTypeKey] && geneFilter[partTypeKey]["part"] || "" ]} CustomComponent={FlexWrap} deselect={true} 
														onChange={ (options:{} ) => {this.onChangeGeneFilter(partTypeKey as PartType, Object.keys(options)[0] )} }
													>
														{bodyPartsByType[partTypeKey]
															.map(partKey => (
																<Toggle color={axieClassColors[partKey.class]} type={ToggleButtonType.Chip} value={partKey.value} style={ {marginRight: "5px", marginBottom: "5px"} }>
																{partKey.label}
															</Toggle>
														))}

													</Select2>
												</div>

												</>
											}
										/>
										
									</div>
								)
							}
						)}
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
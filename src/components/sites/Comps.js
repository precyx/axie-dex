import React from 'react';
// own
import BasicCenterContainer from "../containers/BasicCenterContainer";
import Button from "../ui/Button";
import Textfield from "../ui/Textfield";
import RadioGroup from "../ui/RadioGroup/RadioGroup";

import {ToggleBaseProps, StyledToggleBase} from "../ui/Toggle/ToggleBase";
import {Toggle, ToggleButtonType} from "../ui/Toggle/Toggle";
import { Toggle2} from "../ui/Toggle/Toggle2";

import {Select2} from "../ui/Select/Select2";
import {SimpleSelect} from "../ui/Select/SimpleSelect";
import {TextField} from "../ui/TextField/TextField";
import { Icon } from '../ui/Icon/Icon';

import axieClassColors from "../../data/axie-class-colors";
//
import styled, {css} from 'styled-components';
import ReactSVG from 'react-svg';

//CSS
export const StyledComps = styled.div`
	h1 {font-size:38px; margin-top:40px; text-align:left;}
	h3 {margin-bottom:10px;}

	.box {margin-bottom:40px;}
	.box.buttons .button {margin-right:10px;}
`;


const Badge = styled.p`
	font-weight: bold;
	background: #ff3d3d;
	display: inline-flex;
	border-radius: 50%;
	width: 18px;
	height: 18px;
	justify-content: center;
	align-items: center;
	font-size: 10px;
	color: white;
	margin-right: 5px;
`;


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

const IconToggle = styled(StyledToggleBase)`
	.icon {display:block;}
	.icon2 {display:none;}
	.icon svg, .icon2 svg{ fill:grey;}

	${props => props.color && `
		& {
			.icon svg, .icon2 svg{ fill:${props.color} }
		}
	`}

	${props => props.isOn && `
		.icon {display:none;}
		.icon2 {display:block;}
	`}
`;





const Tiger = styled.div`
	padding:20px;
	background:orange;
`;

const Bear = styled.div`
		border:2px solid brown;
`;



const rainbow = ["#ff1744", "#d500f9", "#651fff", "#3d5afe", "#2979ff", "#00b0ff", "#00e5ff", "#1de9b6", "#c6ff00", "#ffea00", "#ffc400", "#ff9100", "#ff3d00"];


const StyledClassIcon = styled(StyledToggleBase)`
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


const ClassIcon = (props) => (
	<Icon src={"./img/icons/classes/" + props.class + "_24px.svg"} size={22}/>
);


const StyledToggleRect = styled(StyledToggleBase)`
	.rect { 
		background:black;
	}

	:hover {
		opacity:0.8;
	}

	${props => props.isOn && `
		.rect { border:2px solid red; }
	`}
`;

const StyledRect = styled.div`
	background:grey;
	width:40px;
	height:40px;

	${props => props.size && `
		width: ${props.size}px;
		height: ${props.size}px;
	`}
`;

const Rect = (props) => (
	<StyledRect className="rect" {...props} />
);


const Option = styled(StyledToggleBase)`
	font-size:14px;
	color:grey;
	padding:10px;
	width:100%;
	
	:hover {
		background:whitesmoke;
	}

	${props => props.isOn && `
		&&{
			color:black;
			font-weight:500;
		}
	`}
`;


const IconOption = styled(Option)`
	display:flex;
	align-items:center;

	.ui-icon {width:35px!important; opacity:0.5;}

	${props => props.isOn && `
	&&{
		.ui-icon {opacity:1;}
	}
	`}
`;

const StyledOptionBoard = styled.div`
	background:white;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
	display:flex;
	flex-flow:column;

	.ui-select {
		display:flex;
	flex-flow:column;
	}
`; 


const HeaderField = styled.div`
	font-size: 14px;
	font-weight: 500;
	color: grey;
	text-transform: uppercase;
	padding: 10px;
`;


const Row = styled.div`
	display:flex;
	margin-bottom:10px;
`;


const Paper = styled.div`
	background:white; 
	padding:20px;
	border-radius:3px;
`;


const Section = styled.div`
	background:white;
	padding-top:20px;
	padding-bottom:20px;
	margin-bottom:20px;
`;

const Container = styled.div`
	margin:0 auto;
	max-width:1200px;
	padding:0 40px;
`;

const Module = styled.div`
	padding-bottom:40px;
`;

const Columns = styled.div`
	display:flex;
	margin: 0 -20px;
	margin-bottom:40px;

`;

const Column = styled.div`
	flex:1;
	${props => props.w && `
		flex: ${props.w};
	`}
	padding:0 20px;
`;

const List = styled.div`
	display:flex;
	flex-flow:column;
	align-items:end;
`;

const Wrap = styled.div`
	display:flex;
	flex-flow:wrap;
	align-items:end;
`;

const Textarea = styled.textarea`
	outline:none;
	padding:10px;
	border-radius: 6px;
  border-color: #d8d8d8;

	&:focus{
		border: 1px solid #338aea;
	}
`;

/**
 *Class
 *
 * @class Comps
 * @extends {React.PureComponent}
 */
class Comps extends React.PureComponent{

	componentDidMount() {
		console.log(React.version);
		
	}
	

	render(){


		return (
				<StyledComps>





					<Container>
					<h1>Where is the Bear?</h1>
					</Container>

					<Container>
						<h2>And the Honey</h2>
					</Container>


				<Section>
					<Container>
					<Toggle2 />
					</Container>
				</Section>

				<Section>
					<Container>
							<Textarea rows="5" cols="33" spellcheck="false"/>
					</Container>
				</Section>

				<Section>
					<Container>
						<h2>Select2</h2>

						<Columns>
							<Column w={1}>
								<h3>single select</h3>
								<Row>
									<Select2 CustomComponent={Wrap} multiselect={false} options={["kiwi"]} onChange={console.log}>
										<Toggle value="banana" type="radio" color="#00fa77" >Banana</Toggle>
										<Toggle disabled value="apple" type="radio" color="#ff00aa" >Apple</Toggle>
										<Toggle disabled value="kiwi" type="radio" color="#00ad55" >Kiwi</Toggle>
									</Select2>
								</Row>
							</Column>
							<Column w={1}>
							<h3>single select (deselect)</h3>
							<Row>
								<Select2 CustomComponent={Wrap} multiselect={false} deselect={true} onChange={console.log} options={["apple"]}>
									<Toggle value="banana" type="radio" color="#00fa77" >Banana</Toggle>
									<Toggle value="apple" type="radio" color="#ff00aa" >Apple</Toggle>
									<Toggle value="kiwi" type="radio" color="#00ad55" >Kiwi</Toggle>
								</Select2>
							</Row>
							</Column>
							<Column w={1}>
								<h3>multiselect</h3>
								<Select2 CustomComponent={Wrap} multiselect={true} options={["kiwi", "banana"]}>
									<Toggle value="banana" type="checkbox" color="#00fa77" >Banana</Toggle>
									<Toggle value="apple" type="checkbox" color="#00fa77" >Apple</Toggle>
									<Toggle value="kiwi" type="checkbox" color="#00ad55" >Kiwi</Toggle>
								</Select2>
							</Column>
							</Columns>


							<h3>custom</h3>
							<Columns>
								<Column w={1}>
									<Select2 CustomComponent={List}>
										<Toggle color="#bb99aa" type={ToggleButtonType.MaterialSwitch} value="1">one</Toggle>
										<Toggle color="#55aadd" type={ToggleButtonType.MaterialSwitch} value="2">two</Toggle>
										<Toggle color="#99ad01" type={ToggleButtonType.MaterialSwitch} value="3">three</Toggle>
										<Toggle color="#0bfda9" type={ToggleButtonType.MaterialSwitch} value="4">four</Toggle>
									</Select2>
								</Column>
								<Column w={1}>
									<Select2 CustomComponent={List} options={["1", "3", "4"]}>
										<Toggle color="#bb99aa" type={ToggleButtonType.iOSSwitch} value="1">one</Toggle>
										<Toggle color="#55aadd" type={ToggleButtonType.iOSSwitch} value="2">two</Toggle>
										<Toggle color="#99ad01" type={ToggleButtonType.iOSSwitch} value="3">three</Toggle>
										<Toggle color="#0bfda9" type={ToggleButtonType.iOSSwitch} value="4">four</Toggle>
									</Select2>
								</Column>
								<Column w={1}>
									<Select2 CustomComponent={List}>
										<Toggle color="#bb99aa" type={ToggleButtonType.FabricSwitch} value="1">one</Toggle>
										<Toggle color="#55aadd" type={ToggleButtonType.FabricSwitch} value="2">two</Toggle>
										<Toggle color="#99ad01" type={ToggleButtonType.FabricSwitch} value="3">three</Toggle>
										<Toggle color="#0bfda9" type={ToggleButtonType.FabricSwitch} value="4">four</Toggle>
									</Select2>
								</Column>
								<Column w={1}>
									<Select2 deselect={true} CustomComponent={Wrap}>
										{rainbow.map((color, i) => 
											<Toggle key={i} value={"color"+i} CustomComponent={ColorDrop} color={color} style={{marginRight: "5px", marginBottom: "5px"}}> </Toggle>
											)}
									</Select2>
								</Column>
								<Column w={1}>
									<StyledOptionBoard>
									<HeaderField>Header</HeaderField>
									<Select2 multiselect={false}>
										<Toggle value="x1" CustomComponent={Option}>Banana Shake</Toggle>
										<Toggle value="x2" CustomComponent={Option}>Strawberry Cake</Toggle>
										<Toggle value="x3" CustomComponent={Option}>Pinapple Pie</Toggle>
										<Toggle value="x4" CustomComponent={IconOption}> <Icon src="./img/icons/general/star.svg" size="20px" /> Mango Bread </Toggle>
										<Toggle value="x5" CustomComponent={IconOption}> <Icon src="./img/icons/general/star.svg" size="20px" color="#ecad03" /> Orange Juice</Toggle>
										<Toggle value="x6" CustomComponent={IconOption}> <Icon src="./img/icons/general/star.svg" size="20px" color="#74b35a" /> Avocado Soup</Toggle>
									</Select2>
									</StyledOptionBoard>
								</Column>
							</Columns>

					</Container>
				</Section>


				<Section>

	
					<Container>
						<Columns>
						<Paper className="box">
							<h2>Toggle</h2>

							

							{[ToggleButtonType.Chip, 
							ToggleButtonType.Modern, 
							ToggleButtonType.Simple, 
							ToggleButtonType.Radio, 
							ToggleButtonType.Checkbox,
							ToggleButtonType.MaterialSwitch,
							ToggleButtonType.FabricSwitch,
							ToggleButtonType.iOSSwitch,
						].map((type,i) => 
								<>
									<Columns>
										<Column w={1}>
											<h3>{type}</h3>
											<List>
												{[null, "#ff00aa", "#97ddb9", "#350baa"].map((color,j) => 
													<Toggle isOn={true} key={i+j} type={type} color={color} style={{marginRight:"5px", marginBottom:"5px"}}>{type} #{j}</Toggle>
												)}
											</List>
										</Column>
										<Column w={1}>
											<h3>uncontrolled</h3>
											<List>
												{[null, "#ffa73b", "#ff4f4f", "#82bf3e"].map((color,j) => 
													<Toggle y="1" key={i+j} type={type} color={color} style={{marginRight:"5px", marginBottom:"5px"}}>{type} #{j}</Toggle>
												)}
											</List>
										</Column>
										<Column>
											<h3>disabled</h3>
											<List>
												<Toggle disabled isOn={true} key={i+"y"} type={type} style={{marginRight:"5px", marginBottom:"5px"}}>disabled #{i}</Toggle>
												<Toggle disabled key={i+"y"} type={type} style={{marginRight:"5px", marginBottom:"5px"}}>disabled #{i}</Toggle>
											</List>
										</Column>
									</Columns>

								</>
							)}


								

							<Columns>
								<Column>
								<h3>color drops</h3>
								{rainbow.map((color, i) => 
									<Toggle key={i} type="custom" CustomComponent={ColorDrop} color={color} style={{marginRight: "5px"}}> </Toggle>
									)}
								</Column>

								<Column>
									<h3>appends</h3>
									<Toggle type="checkbox">
										<Badge>5</Badge>
									</Toggle>

									<Toggle type="simple" color="#dd97a5" toggleOn={false}>
										<Badge>5</Badge>
										<p>Test</p>
									</Toggle>
								</Column>

								<Column>
									<h3>icon</h3>
									<Toggle CustomComponent={IconToggle} color={"#ff00aa"} style={{marginRight: "10px"}}>
										<Icon className="icon" src={`./img/icons/general/star_border.svg`} size={24} />
										<Icon className="icon2" src={`./img/icons/general/star.svg`} size={24} />
									</Toggle>
								</Column>

								<Column>
									<h3>class icons</h3>
									{Object.keys(axieClassColors).map((axieClassKey,i) => 
										<Toggle key={i} style={{display:"inline-flex", marginLeft: "5px"}} CustomComponent={StyledClassIcon} color={axieClassColors[axieClassKey]}>
											<ClassIcon class={axieClassKey}/>
										</Toggle>
									)}
								</Column>
								<Column>
									<h3>black rects</h3>
									{[10, 15, 20, 25, 40, 60].map((size, i) => (
										<Toggle key={i} CustomComponent={StyledToggleRect}> <Rect size={size}/> </Toggle>
										))}
								</Column>
							</Columns>

							<Columns>
										<Column>
											<Toggle type="chip">
												<Icon src="./img/icons/general/star.svg" size={16} style={{marginRight:"5px"}}/>
												Favorite
											</Toggle>
										</Column>
							</Columns>

							
					</Paper>
						</Columns>
					</Container>


					</Section>
					

					<Section>
						<Container>
							
					<Paper className="box buttons">
						<h2>Buttons</h2>
						<Button name="vanilla button" />
						<Button name="filled" type="filled"/>
						<Button name="outline" type="outline"/>
						<Button name="color filled" type="filled" color="#f8bad9"/>
						<Button name="color outline" type="outline" color="#f8bad9"/>
						<Button name="small" type="filled" color="#63adf7" size="small"/>
						<Button name="small outline" type="outline" color="#63adf7" size="small"/>
					</Paper>
						</Container>
					</Section>


					<Section>
					<Container>

						<Paper className="box">
							<TextField 
								label="Size"
								onChange={()=>{}}
								/>
							<TextField 
								label="Num Elems"
								onChange={()=>{}}
								/>
							<TextField 
								label="Color"
								onChange={()=>{}}
								/>
							<TextField 
								label="Type"
								onChange={()=>{}}
								/>
						</Paper>
					</Container>
					</Section>



					<Section>
						<Container>
						<Paper className="box">
							<h2>Simple Select</h2>
							<SimpleSelect deselect={true}>
								<Toggle label="Option" value="x1"/> 
								<Toggle label="Option" value="x2"/> 
								<Toggle label="Option" value="x3"/> 
								<Toggle label="Option" value="x4"/> 
							</SimpleSelect>
						</Paper>
						</Container>
					</Section>

								

					<Section>
						<Container>
						<Paper className="box">
							<h2>Textfields</h2>
							<Textfield name="name" value="name" />
						</Paper>
						</Container>
					</Section>

					<Section>
						<Container>
						<Paper className="box">
							<h2>Radiogroup</h2>
							<RadioGroup active_option={"apple"} options={[
								{value: "banana", label:"Banana"},
								{value: "apple", label:"Apple"},
								{value: "grape", label:"Grape"},
								]}/>
						</Paper>
						</Container>
					</Section>

								<Section>
									<Container>
									<Paper className="box">
						<h2>Modern</h2>
						<RadioGroup active_option={"stone"} type="modern" color="#77aa02" options={[
							{value: "tree", label:"Tree"},
							{value: "leaf", label:"Leaf"},
							{value: "stone", label:"Stone"},
							]}/>
					</Paper>
									</Container>
								</Section>


					<Section>
						<Container>
						<Paper className="box">
											<h2>Simple</h2>
											<RadioGroup active_option={"giraffe"} type="simple" color="#b024ab" options={[
												{value: "cat", label:"Cat"},
												{value: "giraffe", label:"Giraffe"},
												{value: "badger", label:"Badger"},
												]}/>
										</Paper>
						</Container>
					</Section>




					

				</StyledComps>
		)
	}

}


export default Comps;
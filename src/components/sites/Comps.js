import React from 'react';
// own
import BasicCenterContainer from "../containers/BasicCenterContainer";
import Button from "../ui/Button";
import Textfield from "../ui/Textfield";
import RadioGroup from "../ui/RadioGroup/RadioGroup";

import {ToggleBaseProps, StyledToggleBase} from "../ui/Toggle/ToggleBase";
import {Toggle, ToggleButtonType} from "../ui/Toggle/Toggle";

import {Select2} from "../ui/Select/Select2";
import {SimpleSelect} from "../ui/Select/SimpleSelect";
import {TextField} from "../ui/TextField/TextField";
import { Icon } from '../ui/Icon/Icon';
//
import styled, {css} from 'styled-components';
import ReactSVG from 'react-svg';

//CSS
export const StyledPartTierList = styled.div`
	h1 {font-size:38px; text-align:center; margin-top:40px;}
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


const Row = styled.div`
		display:flex;
		margin-bottom:10px;
`;


const Paper = styled.div`
		background:white; 
		padding:20px;
		border-radius:3px;
`;


const rainbow = ["#ff1744", "#d500f9", "#651fff", "#3d5afe", "#2979ff", "#00b0ff", "#00e5ff", "#1de9b6", "#c6ff00", "#ffea00", "#ffc400", "#ff9100", "#ff3d00"];


class Comps extends React.PureComponent{



	render(){


		return (
			<BasicCenterContainer>
				<StyledPartTierList>


					<h1>Where is the Bear?</h1>
					<h2>And the Honey</h2>

					
					<h1>Components</h1>

					<Paper className="box">
						<h2>Select2</h2>

						<h3>single select</h3>
						<Row>
							<Select2 multiselect={false} options={["kiwi"]} onChange={console.log}>
								<Toggle value="banana" type="radio" color="#00fa77" >Banana</Toggle>
								<Toggle value="apple" type="radio" color="#ff00aa" >Apple</Toggle>
								<Toggle value="kiwi" type="radio" color="#00ad55" >Kiwi</Toggle>
							</Select2>
						</Row>
						<h3>single select (deselect)</h3>
						<Row>
							<Select2 multiselect={false} deselect={true} onChange={console.log} options={["apple"]}>
								<Toggle value="banana" type="radio" color="#00fa77" >Banana</Toggle>
								<Toggle value="apple" type="radio" color="#ff00aa" >Apple</Toggle>
								<Toggle value="kiwi" type="radio" color="#00ad55" >Kiwi</Toggle>
							</Select2>
						</Row>
						<h3>multiselect</h3>
						<Row>
							<Select2 multiselect={true} options={["kiwi", "banana"]}>
								<Toggle value="banana" type="checkbox" color="#00fa77" >Banana</Toggle>
								<Toggle value="apple" type="checkbox" color="#ff00aa" >Apple</Toggle>
								<Toggle value="kiwi" type="checkbox" color="#00ad55" >Kiwi</Toggle>
							</Select2>
						</Row>
						<h3>custom</h3>
						<Row>
							<Select2 deselect={true}>
								{rainbow.map((color, i) => 
									<Toggle key={i} value={"color"+i} CustomComponent={ColorDrop} color={color} style={{marginRight: "5px"}}> </Toggle>
								)}
							</Select2>
						</Row>
					</Paper>



					<Paper className="box">
							<h2>Toggle</h2>

							<h3>chip, modern, simple, radio, checkbox</h3>

							{[ToggleButtonType.Chip, 
							ToggleButtonType.Modern, 
							ToggleButtonType.Simple, 
							ToggleButtonType.Radio, 
							ToggleButtonType.Checkbox].map((type,i) => 
								<>
									<Row>
									{[null, "#ff00aa", "#97ddb9", "#350baa"].map((color,j) => 
										<Toggle isOn={true} key={i+j} type={type} color={color} style={{marginLeft:"10px", marginBottom:"10px"}}>{type} #{j}</Toggle>
									)}
									</Row>
									<Row>

									{[null, "#ffa73b", "#ff4f4f", "#82bf3e"].map((color,j) => 
										<Toggle key={i+j} type={type} color={color} style={{marginLeft:"5px"}}>{type} #{j}</Toggle>
									)}
									</Row>
								</>
							)}

							<Toggle type="checkbox">
								<Badge>5</Badge>
							</Toggle>

							<Toggle type="simple" color="#dd97a5" toggleOn={false}>
								<Badge>5</Badge>
								<p>Test</p>
							</Toggle>
								
							<h3>custom</h3>

							<Row>
							{rainbow.map((color, i) => 
								<Toggle key={i} type="custom" CustomComponent={ColorDrop} color={color} style={{marginRight: "5px"}}> </Toggle>
								)}
							</Row>

							<Row>
								<Toggle CustomComponent={IconToggle} color={"#ff00aa"} style={{marginRight: "10px"}}>
									<Icon className="icon" src={`./img/icons/general/star_border.svg`} size={24} />
									<Icon className="icon2" src={`./img/icons/general/star.svg`} size={24} />
								</Toggle>
							</Row>

							
					</Paper>

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




					<Paper className="box">
						<h2>Simple Select</h2>
						<SimpleSelect options={[
							{label: "Apple", value: "apple"},
							{label: "Banana", value: "banana"},
							{label: "Melon", value: "melon"},
							{label: "Kiwi", value: "kiwi"},
						]}>
						</SimpleSelect>
					</Paper>
								


					<Paper className="box">
						<h2>Textfields</h2>
						<Textfield name="name" value="name" />
					</Paper>

					<Paper className="box">
						<h2>Radiogroup</h2>
						<RadioGroup active_option={"apple"} options={[
							{value: "banana", label:"Banana"},
							{value: "apple", label:"Apple"},
							{value: "grape", label:"Grape"},
							]}/>
					</Paper>


					<Paper className="box">
						<h2>Modern</h2>
						<RadioGroup active_option={"stone"} type="modern" color="#77aa02" options={[
							{value: "tree", label:"Tree"},
							{value: "leaf", label:"Leaf"},
							{value: "stone", label:"Stone"},
							]}/>
					</Paper>


					<Paper className="box">
						<h2>Simple</h2>
						<RadioGroup active_option={"giraffe"} type="simple" color="#b024ab" options={[
							{value: "cat", label:"Cat"},
							{value: "giraffe", label:"Giraffe"},
							{value: "badger", label:"Badger"},
							]}/>
					</Paper>



					

				</StyledPartTierList>
			</BasicCenterContainer>
		)
	}

}


export default Comps;
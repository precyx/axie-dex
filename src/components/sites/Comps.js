import React from 'react';
// own
import BasicCenterContainer from "../containers/BasicCenterContainer";
import Button from "../ui/Button";
import Textfield from "../ui/Textfield";
import RadioGroup from "../ui/RadioGroup/RadioGroup";

import {ToggleBase} from "../ui/Toggle/ToggleBase";
import {Toggle} from "../ui/Toggle/Toggle";
import {ToggleButtonType} from "../ui/Toggle/Toggle";
import {Select2} from "../ui/Select/Select2";
import {SimpleSelect} from "../ui/Select/SimpleSelect";
import {TextField} from "../ui/TextField/TextField";
//
import styled, {css} from 'styled-components';
import ReactSVG from 'react-svg';

//CSS
export const StyledPartTierList = styled.div`
	h1 {font-size:38px; text-align:center; margin-top:40px;}

	.box {margin-bottom:40px;}
	.box.buttons .button {margin-right:10px;}

`;

class Comps extends React.PureComponent{



	render(){
		let StyledBadge = styled.p`
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

		return (
			<BasicCenterContainer>
				<StyledPartTierList>


					<h1>Where is the Bear?</h1>
					<h2>And the Honey</h2>

					
					<h1>Components</h1>

					<div className="box">
							<h2>Toggle</h2>
							<ToggleBase on={true}>
									Test
							</ToggleBase>


							{[ToggleButtonType.Chip, ToggleButtonType.Modern, ToggleButtonType.Simple].map((type,i) => (
								[null, "#ff00aa", "#97ddb9", "#350baa"].map((color,j) => 
									<Toggle key={i+j} type={type} color={color}>{type} #{j}</Toggle>
								)
							)
							)}

							<Toggle type="simple" color="#dd9b7a5" toggleOn={false}>
								<StyledBadge>5</StyledBadge>
								<p>Test</p>
							</Toggle>

							<Toggle onToggle={console.log} value="test" type="modern" color="#ff00aa" toggleOn={true}>Modern</Toggle>
					</div>

					<div className="box buttons">
						<h2>Buttons</h2>
						<Button name="vanilla button" />
						<Button name="filled" type="filled"/>
						<Button name="outline" type="outline"/>
						<Button name="color filled" type="filled" color="#f8bad9"/>
						<Button name="color outline" type="outline" color="#f8bad9"/>
						<Button name="small" type="filled" color="#63adf7" size="small"/>
						<Button name="small outline" type="outline" color="#63adf7" size="small"/>
					</div>

					<div className="box">
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
					</div>

					<div className="box">
						<h2>Select</h2>
						<Select2 options={[
							<Toggle onToggle={console.log} value="test" type="modern" color="#ff00aa" toggleOn={false}>Option 1</Toggle>,
							<Toggle onToggle={console.log} value="test2" type="modern" color="#ff00aa" toggleOn={true}>Option 2</Toggle>
						]}/>
					</div>


					<div className="box">
						<h2>Simple Select</h2>
						<SimpleSelect options={[
							{label: "Apple", value: "apple"},
							{label: "Banana", value: "banana"},
							{label: "Melon", value: "melon"},
							{label: "Kiwi", value: "kiwi"},
						]}>
						</SimpleSelect>
					</div>
								


					<div className="box">
						<h2>Textfields</h2>
						<Textfield name="name" value="name" />
					</div>

					<div className="box">
						<h2>Radiogroup</h2>
						<RadioGroup active_option={"apple"} options={[
							{value: "banana", label:"Banana"},
							{value: "apple", label:"Apple"},
							{value: "grape", label:"Grape"},
							]}/>
					</div>


					<div className="box">
						<h2>Modern</h2>
						<RadioGroup active_option={"stone"} type="modern" color="#77aa02" options={[
							{value: "tree", label:"Tree"},
							{value: "leaf", label:"Leaf"},
							{value: "stone", label:"Stone"},
							]}/>
					</div>


					<div className="box">
						<h2>Simple</h2>
						<RadioGroup active_option={"giraffe"} type="simple" color="#b024ab" options={[
							{value: "cat", label:"Cat"},
							{value: "giraffe", label:"Giraffe"},
							{value: "badger", label:"Badger"},
							]}/>
					</div>



					

				</StyledPartTierList>
			</BasicCenterContainer>
		)
	}

}


export default Comps;
import React from 'react';
// own
import BasicCenterContainer from "../containers/BasicCenterContainer";
import Button from "../ui/Button";
import Textfield from "../ui/Textfield";
import RadioGroup from "../ui/RadioGroup/RadioGroup";
//
import styled from 'styled-components';

//CSS
export const StyledPartTierList = styled.div`
	h1 {font-size:38px; text-align:center; margin-top:40px;}

	.box {margin-bottom:40px;}
	.box.buttons .button {margin-right:10px;}

`;

class Comps extends React.PureComponent{

	render(){
		return (
			<BasicCenterContainer>
				<StyledPartTierList>


					<h1>Where is the Bear?</h1>
					<h2>And the Honey</h2>

					
					<h1>Components</h1>

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
						<RadioGroup active_option={"stone"} type="modern" color="pink" options={[
							{value: "tree", label:"Tree"},
							{value: "leaf", label:"Leaf"},
							{value: "stone", label:"Stone"},
							]}/>
					</div>


					<div className="box">
						<h2>Simple</h2>
						<RadioGroup active_option={"giraffe"} type="simple" color="brown" options={[
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
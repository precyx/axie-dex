import React from 'react';
//
import {WEB3_V1} from "../../services/web3-service";
// css
import {StyledMethodFilter} from "./styles/StyledMethodFilter";
//
import {DexColorTheme} from "../../data/dex-material-color-theme";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import RadioGroup from "../ui/RadioGroup/RadioGroup";

class MethodFilter extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			checkConstant: false,
		}
	}
	componentDidMount() {
		WEB3_V1.connectWeb3();
	}

	handleChange = value => {
		this.props.onChangeFilter(value);
	}

	colorTheme = createMuiTheme(DexColorTheme);
	render(){
		const checkConstant = this.state.checkConstant;
		//
		return (
			<MuiThemeProvider theme={this.colorTheme}>
				<StyledMethodFilter>
					<RadioGroup onChange={this.handleChange} type="modern" color="#9202ba" active_option="all" options={[
						{label: "All", value: "all"},
						{label: "Constant", value: "constant"},
						{label: "Event", value: "event"},
						{label: "Payable", value: "payable"},
					]}/>
				</StyledMethodFilter>
			</MuiThemeProvider>
		)
	}

}

export default MethodFilter;


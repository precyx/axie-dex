import React from 'react';
import TextField from '@material-ui/core/TextField';

export default class PureTextField extends React.Component {


	shouldComponentUpdate(nextProps, nextState){
		console.log(this.props, nextProps);
		return false;
	}

  render() {
		const label 		= this.props.label;
		const value 		= this.props.value;
		const multiline = this.props.multiline;
		const variant 	= this.props.variant;
		const margin 		= this.props.margin;
		const onChange 	= this.props.onChange;

		console.log("render pure textfield");
    return (
			<div>
				<h3>Pure :L</h3>
				<TextField
					label={label}
					value={value}
					multiline={multiline}
					variant={variant}
					margin={margin}
					onChange={onChange}
				/>
			</div>
    )
  }
}
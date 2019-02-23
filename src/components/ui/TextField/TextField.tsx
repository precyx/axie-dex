import React from "react";

import styled, {css} from "styled-components";

interface TextFieldProps {
  value:string,
  label:string,
  onChange?:Function,
  className:string,
}
interface TextFieldState {
  isControlled:boolean;
  value:string,
}

const StyledTextField = styled.div`

  display: flex;
  flex-flow: wrap;
  align-items: center;
  margin-bottom:10px;

  label {
    width:100px;
  }

  .inputContainer {
    display: flex;
    flex-flow: column;
    flex-grow: 1;
  }

  input {
    border-radius: 5px;
    border: 1px solid #b2b2b2;
    padding: 10px 8px;
    outline: none;
  }
  input:focus {
    border:2px solid #2593ff;
  }
`;


export class TextField extends React.PureComponent<TextFieldProps, TextFieldState>{
  constructor(props:TextFieldProps){
    super(props);
    this.state = {
      isControlled: this.props.value ? false : true,
      value: "",
    }
  }

  handleChange = (event:React.FormEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    if(!this.state.isControlled){
      this.setState({ value: val })
    }
    console.log("new val", val);
    if(this.props.onChange) this.props.onChange(val);
  }

  render(){
    const {className} = this.props;
    const isControlled = this.state.isControlled;
    const {label} = this.props;
    return <StyledTextField className={className}>
      {label && <label>{label}</label>}
      <div className="inputContainer">
      <input
        type="text" 
        name={this.props.label}
        placeholder={this.props.label}
        value={isControlled ? this.props.value : this.state.value} 
        onChange={this.handleChange}
        />
      </div>
    </StyledTextField>
  }
}
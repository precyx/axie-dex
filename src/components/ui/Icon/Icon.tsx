import * as React from 'react';

import ReactSVG from 'react-svg';

import styled, {css} from 'styled-components';

interface IconProps {
	src:string,
	size:number,
	color?:string,
	className?:string,
	style?:any,
}


export const Icon:React.FC<IconProps> = (props:IconProps) => {
	const {src, size, color, style} = props;
	const className = props.className || "";
	return (
		<ReactSVG className={"ui-icon " + className} src={src} style={{width:size, height:size, ...style}} svgStyle={{width:size, height:size, fill:color || "#000000"}} />
	)
}
import * as React from 'react';

import ReactSVG from 'react-svg';

import styled, {css} from 'styled-components';

interface IconProps {
	src:string,
	size:number,
	color?:string,
	className?:string,
}


export const Icon:React.FC<IconProps> = (props:IconProps) => {
	const {src, size, color, className} = props;
	return (
	<ReactSVG className={className} src={src} style={{width:size, height:size}} svgStyle={{width:size, height:size, fill:color || "#000000"}}/>
)}
import React, {useState, useEffect} from "react";
import styled from "styled-components";

import Spinner from 'react-spinner-material';

// service
import {AxieV2, BodyPart, GenericResponse, Axie, AxieAdult} from "../../services/axie-data-service2"; 


const StyledPartDex = styled.div`
	h2 {
		font-size: 22px;
    font-weight: normal;
	}
	h3 {
		margin-bottom:10px;
		font-size:18px;
		font-weight:normal;
	}
`;

const Titlebar = styled.div`
	margin: 0 80px;
`;

const Part = styled.div<{specialGenes?:string}>`
	display:flex; 
	align-items:center;
	color:black;
	font-size: 18px;
	max-width:400px;
	border-bottom: 1px solid #ececec;
	padding:10px 0;
	.name {flex:3;}
	.class {font-size:12px; flex:1;}
	.type {font-size:12px; flex:1;}
	.count {flex:1; font-size:14px; text-align:right;}
	.img {
		width:100px;
	}
	img {
		max-width: 40px;
    max-height: 40px;
	}

	${props => props.specialGenes === "mystic" &&`
		.name {color:#46b3f5;}
	`}
	
	${props => props.specialGenes === "japan" &&`
		.name {color:orange;}
	`}

	${props => props.specialGenes === "bionic" &&`
		.name {color:red;}
	`}

`;

const Cols = styled.div`
	display:flex;
	margin: 0 80px;
  min-width: 330px;
`;
const Col = styled.div`
	flex-basis:50%;
	margin: 20px 0;
`;

interface PartCount {
	part:BodyPart;
	count:number;
}

interface PartSet {
	regular: PartCount[];
	mystic: PartCount[];
	japan?: PartCount[];
	bionic?: PartCount[];
}


export const PartDex = () => {

	const [partSet, setPartSet]:[any, Function] = useState({});
	const [loaded, setLoaded]:[boolean, Function] = useState(false);

	const [addr, setAddr]:[string, Function] = useState("0x288bf6134BeB79D63173A13d65bc92F4EBD718B2"); // @todo make address dynamic

	useEffect(()=>{


		getData();
		play();
	}, []);

	const play = async () => {
		var axie:GenericResponse<Axie> = await AxieV2.getAxie(50400);
	}

	const getData = async () => {
		const bodyParts:BodyPart[] = await AxieV2.getBodyParts();
		const first10Parts:BodyPart[] = bodyParts.slice(0, 30);
		console.log("b", first10Parts);

		const promises:Promise<any>[] = [];

		bodyParts.forEach(part => {
			promises.push(AxieV2.getAxiesByAddress(addr, {parts:[part.partId]}));
		})
		let dat = await Promise.all(promises);
		console.log("xxx", dat);

		let partCounts:PartCount[] = [];
		partCounts = dat.map((d,i) => {
			return {count: d.totalAxies, part: bodyParts[i]};
		}).sort((a:any,b:any)=>{
			if(a.count > b.count) return 1;
			else return -1;
		});
		

		let regularCounts:PartCount[] = [];
		regularCounts = partCounts.filter(e => {
			return e.part.specialGenes == null
		})
		
		let mysticCounts:PartCount[] = [];
		mysticCounts = partCounts.filter(e => {
			return e.part.specialGenes == "mystic"
		})

		let japanCounts:PartCount[] = [];
		japanCounts = partCounts.filter(e => {
			return e.part.specialGenes == "japan"
		})

		let bionicCounts:PartCount[] = [];
		bionicCounts = partCounts.filter(e => {
			return e.part.specialGenes == "bionic"
		})
	
		let partSet:PartSet = {
			regular: regularCounts,
			mystic: mysticCounts,
			japan: japanCounts,
			bionic: bionicCounts,
		}
		
		setPartSet(partSet);
		setLoaded(true);
		console.log("pp", partSet);
	}

	const renderParts = (partCounts:PartCount[]) => {
		return partCounts.map(part => 

			<Part key={part.part.partId} specialGenes={part.part.specialGenes || ""}>
				<div className="img">
					<img src={`/img/parts/${part.part.name}_${part.part.type}_${part.part.class}.png`} />	
				</div>
				<div className="name">{part.part.name}</div>
				<div className="class">{part.part.class}</div>
				<div className="type">{part.part.type}</div>
				<div className="count">{part.count}</div>
			</Part>
		);
	}


	return (
		<StyledPartDex>
			<Titlebar>
				<h2>{addr}</h2>
			</Titlebar>
			<Cols>
				{!loaded
				? <Spinner size={30} spinnerColor={"#a146ef"} spinnerWidth={3} visible={true} /> 
				: <>
				<Col>
					<h3>Regular</h3>
					{renderParts(partSet.regular)}
				</Col>
				<Col>
					<h3>Mystic</h3>
					{renderParts(partSet.mystic)}
				</Col>
				<Col>
					<h3>Japan</h3>
					{renderParts(partSet.japan)}
				</Col>
				</> }
			</Cols>
		</StyledPartDex>
	)
}
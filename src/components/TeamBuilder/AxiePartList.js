import React from 'react';
import styled, { css } from "styled-components";
// axie
import AxiePartIcon from '../Axie/AxiePartIcon';

//CSS
const StyledAxiePartList = styled.div`
	/* component */
	width:500px; 
	font-size:12px; 
	background: white; 
	z-index: 30; 
	padding: 10px 0;
	box-shadow: 0 2px 11px #0000007a; 
	border-radius: 3px; 
	height:400px; 
	max-height: calc(100vh - 200px); 

	/* parts */
	.parts {overflow-y: scroll; height:90%;}
	/* part */
	.part {display:flex; width:100%; justify-content:flex-start; align-items: center;  padding: 3px 20px;}
	.part:hover {background:#efefef; }
	.part .myPartIcon, .head .partType{width:50px; }
	.part .count, .head .count {width:80px; margin-left:0; color:#666;}
	.part .name, .head .name{width:120px; }
	.part .name.mystic {color:#5c9bec;}
	.part .stats, .head .flex {width:160px; display:flex;}
	.part .innerStats, .head .innerStats {display:flex;}
	.part .stat, .head .stat {width:45px;}
	.part .atk {color:#d66666;}
	.part .def {color:#1ba91b;}
	.part .acc {color:#b865d2;}
	.part .ath {color:#cc603e;}
	.part .adt {color:#5ca296;}
	/* header */
	.head {display:flex; font-size:10px; width:100%; color:grey;  padding: 10px 20px; }
	.head .field {cursor:pointer; user-select:none;}
	.head .field:hover {color:#404040;}
	/* conditional styles */
	${({ x }) => x && css``}
`;

class AxiePartList extends React.PureComponent {

	constructor(props){
		super(props);
		this.state = {
			allParts: props.parts,
			parts: props.parts,
			sortings: {},
		}
	}

	/* filtering */
	sortByCount = () => {
		var newSortings = Object.assign({}, this.state.sortings);
		newSortings["count"] = newSortings["count"] ? newSortings["count"] * -1 : 1;
		//
		var newParts = [...this.state.allParts];
		newParts.sort((a, b)=>{
			if(newSortings["count"] === 1) 			 return a["count"] - b["count"];
			else if(newSortings["count"] === -1) return b["count"] - a["count"];
			else return a["count"] - b["count"];
		});
		this.setState({
			parts: newParts,
			sortings: newSortings,
		});
	}

	sortByStat = (statToSort) => {
		// make copies of data
		var newSortings = Object.assign({}, this.state.sortings);
		newSortings[statToSort] = newSortings[statToSort] ? newSortings[statToSort] * -1 : 1;
		var newParts = [...this.state.allParts];
		// split parts by moves and move-less
		var partsWithMoves = newParts.filter(part => part.partData.moves[0] );
		var partsWithoutMoves = newParts.filter(part => !part.partData.moves[0] );
		// sort parts with moves
		partsWithMoves.sort((a, b)=>{
			if(newSortings[statToSort] === 1) 			return a.partData.moves[0][statToSort] - b.partData.moves[0][statToSort];
			else if(newSortings[statToSort] === -1) return b.partData.moves[0][statToSort] - a.partData.moves[0][statToSort];
		});
		// append moveless parts to end
		newParts = [...partsWithMoves, ...partsWithoutMoves];
		this.setState({
			parts: newParts,
			sortings: newSortings,
		});
	}

	sortByPropAlphabetically = (propName) => {
		var newSortings = Object.assign({}, this.state.sortings);
		newSortings[propName] = newSortings[propName] ? newSortings[propName] * -1 : 1;
		//
		var newParts = [...this.state.allParts];
		newParts.sort((a, b)=>{
			if(newSortings[propName] === 1) 		  return a.partData[propName] > b.partData[propName] ? 1 : -1;
			else if(newSortings[propName] === -1) return a.partData[propName] < b.partData[propName] ? 1 : -1;
		});
		this.setState({
			parts: newParts,
			sortings: newSortings,
		});
	}

	render() {
		console.log("render partList");
		var allParts = "";
		if(this.state.parts &&
			 this.state.parts.length){
			 var parts = this.state.parts.map((part)=> 
				<div className="part" key={part.partData.id} onClick={() => {this.props.onClickPart(part)}}>
					<div className="myPartIcon">
						<AxiePartIcon type={part.partData.type} axieClass={part.partData.class}/>
					</div>
					<div className={"name" + (part.partData.mystic ? " mystic" : "")} >{part.partData.name}</div> 
					<div className="count">{part.count}</div>
					
					{/* stats */}
					<div className="stats">
						{part.partData.moves && part.partData.moves[0] ? 
							<div className="innerStats">
								<div className="atk stat">{part.partData.moves[0].attack}</div>
								<div className="def stat">{part.partData.moves[0].defense}</div>
								<div className="acc stat">{part.partData.moves[0].accuracy}</div>
								<div style={{display:"none"}} className="ath stat">{Math.round(+part.partData.moves[0].attack * +part.partData.moves[0].accuracy/100)}</div>
								<div style={{display:"none"}} className="adt stat">{Math.round(+part.partData.moves[0].attack * +part.partData.moves[0].accuracy/100 + +part.partData.moves[0].defense)}</div>
							</div>
						: ""}
					</div>

				</div>
			 );
			 allParts = (
				<div className="parts">
					{parts}
				</div>
			 );
		}

		return (
			<StyledAxiePartList className={"axiePartList" + " " + this.props.className}>
				<div className="head">
					<div className="field partType">
						<div onClick={() => {this.sortByPropAlphabetically("class"); }}>Class</div>
						<div onClick={() => {this.sortByPropAlphabetically("type"); }}>Type</div>
					</div>
					<div className="field name">
						<div onClick={() => {this.sortByPropAlphabetically("name"); }}>Name</div>
						<div onClick={() => {this.sortByPropAlphabetically("mystic"); }}>Mystic</div>
					</div>
					<div className="field count" onClick={() => {this.sortByCount(); }}>Count</div>
					<div className="fieldGroup innerStats">
						<div className="field stat atk" onClick={() => {this.sortByStat("attack"); }}>Atk</div>
						<div className="field stat def" onClick={() => {this.sortByStat("defense"); }}>Def</div>
						<div className="field stat acc" onClick={() => {this.sortByStat("accuracy"); }}>Acc</div>
					</div>
				</div>
				{allParts}
			</StyledAxiePartList>
		);
	}
}

export default AxiePartList;
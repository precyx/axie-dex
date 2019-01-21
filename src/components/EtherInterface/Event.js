import React from 'react';
//
import Button from "../ui/Button";
// css
import {StyledEvent} from "./styles/StyledEvent";
//
import PropTypes from 'prop-types';
//
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { WEB3_V1 } from '../../services/web3-service';
//
import TimeAgo from 'react-timeago';

class Event extends React.PureComponent{
	//
	constructor(props){
		super(props);
		this.state = {
			events: [],
			tableData: {},
		}
	}

	clickEvent = (timeframe) => {
		const data = this.props.data;
		this.props.onClickEvent(data, timeframe, this.onReceiveEvents);
	}

	onReceiveEvents = async (events) => {
		const mappedEvents = await this.mapEvents(events);
		console.log("m", mappedEvents);
		console.log("ev", events);
		//
		this.setState({
			events: events,
			tableData: mappedEvents,
		})
	}

	mapEvents = async (events) => {
		const inputs = this.props.data.inputs;
		let newEventPromises = events.map(async event => {
			let returnVals = [];
			inputs.forEach(input => {
				returnVals.push(event.returnValues[input.name]);
			})
			let block = await WEB3_V1.getBlockOf(event.blockNumber);
			return {
				"returnValues" : [...returnVals],
				"transactionHash" : event.transactionHash,
				"timestamp" : block.timestamp,
			};
		}) 
		return Promise.all(newEventPromises).then(newEvents => {
			console.log("all", newEvents);
			let headerFields = inputs.map(input =>{ return input.name});
			headerFields.push("TX");
			headerFields.push("timestamp");
			return {
				"header": headerFields,
				"data" : newEvents,
			}
		})
	}


	render(){
		const data = this.props.data;
		const inputs = data.inputs || [];
		const outputs = data.outputs || [];
		const result = this.props.result || "";
		//
		const inputFields = inputs.map((input, i) => {
			const name = input.name || "";
			const type = input.type || "";
			const label = name + " (" + type + ")";
			const id = "field_"+i;
			return (
				<div key={id}>{label}</div>
			)
		})

		const tableData = this.state.tableData;

		const tableBody = tableData.data ? tableData.data.map((tablefields,i) => {
			return (
				<TableRow key={i} className="line">
					{tablefields.returnValues.map((tablefield, j) => {
						return (
							<TableCell key={j}>
								{tablefield}
							</TableCell>
						)
					})}
					<TableCell>
						<a target="_blank" href={"https://etherscan.io/tx/" + tablefields["transactionHash"]}>
							{tablefields["transactionHash"]}
						</a>
					</TableCell>
					<TableCell>
						<TimeAgo date={tablefields["timestamp"] * 1000} />
					</TableCell>
				</TableRow>
			)
		}) : "";

		const tableHeader = tableData.header ? this.state.tableData.header.map((headerfield,i) => {
			return (
				<TableCell key={i}>{headerfield}</TableCell>
			)
		}) : "";

		return (
			<StyledEvent className="event">
				<div className="titleBar">
					<h2>{data.name}({inputs.length})</h2>
					{data.type == "event" ? <div className="event tag">event</div> : ""}
				</div>
				<div className="params">
					{inputFields}
				</div>
				<div className="count">
					Showing {tableBody.length} Events
				</div>
				<div className="events">
					<Table>
						<TableHead>
							<TableRow>
								{tableHeader}
							</TableRow>
						</TableHead>
						<TableBody>
							{tableBody}
						</TableBody>
					</Table>
				</div>

				<div className="callBar">
					<Button type="filled" color="#bb88dd" name={"5m"} onClick={() => { this.clickEvent("5m") }}/>
					<Button type="filled" color="#bb88dd" name={"1h"} onClick={() => { this.clickEvent("1h") }}/>
					<Button type="filled" color="#bb88dd" name={"1d"} onClick={() => { this.clickEvent("1d") }}/>
					<Button type="filled" color="#bb88dd" name={"1w"} onClick={() => { this.clickEvent("1w") }}/>
					<Button type="filled" color="#bb88dd" name={"all"} onClick={() => { this.clickEvent("all") }}/>
				</div>
			</StyledEvent>
		)
	}
}

Event.propTypes = {
	data: PropTypes.object.isRequired,
}

export default Event;
import React, { useState, useEffect } from "react";

import "../../styles/List.scss";
import ListItem from "./ListItem.jsx";

const List = () => {
	const [data, setData] = useState("");
	const [list, setList] = useState([]);
	const [placehold, setPlacehold] = useState("To do...");
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Javi", {
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		})
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				let dataFalse = data.filter(task => !task.done);
				setList(dataFalse);
				return dataFalse;
			})
			.catch(error => console.error(error));
	}, [list]);
	const putFetch = (fMethod, fBody) => {
		const url = "https://assets.breatheco.de/apis/fake/todos/user/Javi";
		const header = {
			method: fMethod,
			body: fBody,
			headers: {
				"Content-Type": "application/json"
			}
		};

		fetch(url, header)
			.then(res => res.json())
			.then(data => console.log(data))
			.catch(error => console.error(error));
	};
	// function to remove tasks from the list
	const handleClik = i => {
		list[i].done = true;
		putFetch("PUT", JSON.stringify(list));
	};
	// function to update the tasks in the list
	const handleSubmit = ev => {
		ev.preventDefault();
		let myList = list;
		myList.push({ label: data, done: false });
		setList(myList);
		putFetch("PUT", JSON.stringify(list));
	};
	const deleteAll = () => {
		for (let val in list) {
			list[val].done = true;
		}
		setList(list);
		putFetch("PUT", JSON.stringify(list));
	};
	return (
		<>
			<div id="myDIV" className="header ">
				<h2>My To Do List</h2>
				<form
					onSubmit={ev => {
						handleSubmit(ev);
						ev.target.reset();
						setPlacehold("another to do...");
					}}>
					<div className="d-flex justify-content-center">
						<input
							type="text"
							id="myInput"
							placeholder={placehold}
							onChange={ev => setData(ev.target.value)}
						/>
						<button
							onClick={() => deleteAll()}
							type="button"
							className="btn btn-warning">
							Delete list
						</button>
					</div>
				</form>
			</div>
			<ul>
				{list.map((value, i) => (
					<ListItem
						key={i}
						ix={i}
						valueR={value.label}
						removeHandler={() => handleClik(i)}
					/>
				))}
			</ul>
		</>
	);
};
export default List;

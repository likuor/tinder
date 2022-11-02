import { List } from "@mui/material";
import React, { useEffect, useRef, useState, useContext } from "react";
import io from "socket.io-client";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const socket = io("http://localhost:8000", { query: { id: "1234" } });
const Chat = () => {
	const { user, setUser } = useContext(AuthContext);
	console.log("user",user);
	useEffect(() => {
		const roomId = "assjkdfw3u4ifiale";
		socket.emit("join_room", roomId);
	}, []);
	
	const [currentUser, setCurrentUser] = useState({});
	console.log("now",currentUser);
	// const [user, setUser] = useState("");
	const [match, setMatched] = useState({ interests: [] });
	// const handleLeave = () => {
	// 	setUser("");
	// 	socket.emit("disconnect");
	// };
	const handlelike = () => {
		axios
			.post("http://localhost:8000/sendlike", {
				from: "635c1b0f1b5bf56ef76010c0",
				to: "635c1acb1b5bf56ef76010ba",
			})
			.then((res) => {
				console.log("like", res);
				if (res.data.userInfo !== undefined) return setMatched(res.data.userInfo);
			});
	};
	return (
		<section>
			<button onClick={handlelike}>LIKE</button>
			{/* <button onClick={handleLeave}>leave</button> */}
			<p> user {currentUser.username}</p>
			<div>
				{" "}
				matched User
				<p>name : {match.username}</p>
				<ul>
					{match.interests.map((item, index) => {
						return <li key={index}>{item}</li>;
					})}
				</ul>
			</div>
		</section>
	);
};

export default Chat;

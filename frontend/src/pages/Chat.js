import { List } from "@mui/material";
import React, { useEffect, useRef, useState, useContext } from "react";
import io from "socket.io-client";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const socket = io("http://localhost:8000", { query: { id: "1234" } });
const Chat = () => {
	const { user, setUser } = useContext(AuthContext);
	console.log("user",user);
	// useEffect(() => {
	// 	const roomId = "assjkdfw3u4ifiale";
	// 	socket.emit("join_room", roomId);
	// }, []);
	useEffect(() => {
		// console.log("user", user);
		// axios
		// 	.post("http://localhost:8000/login", {
		// 		email: "Rachel@gmail.com",
		// 		password: "Rachel0000",
		// 	})
		// 	.then((res) => {
		// 		setCurrentUser(res.data);
		// 		// console.log("user", res.data);
		// 	});
		// console.log(user);
		setCurrentUser(user)
		socket.on("recived_msg", (data) => {
			console.log("data", data);
			// setMsg([..., data.msg]);
			setList((prev) => [...prev, data]);
		});
		socket.on("joined_room", (roomId, user) => {
			setRoom(roomId);
			// setUser(socket.id);
		});
	}, []);
	const [currentUser, setCurrentUser] = useState({});
	console.log("now",currentUser);
	const [room, setRoom] = useState("");
	const [list, setList] = useState([]);
	// const [user, setUser] = useState("");
	const [msgUser, setMagUser] = useState("");
	const [match, setMatched] = useState({ interests: [] });
	const messageRef = useRef();
	const handleSend = (e) => {
		e.preventDefault();
		socket.emit("send_msg", {
			msg: messageRef.current.value,
			user_id: socket.id,
		});
		messageRef.current.value = "";
	};
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
				if (res.data.userInfo !== undefined) {
					setMatched(res.data.userInfo);
					setRoom(res.data.chat.room_id)
					socket.emit("join_room", res.data.chat.room_id);
				}
			});
	};
	return (
		<section>
			<form onSubmit={handleSend}>
				<input type='text' placeholder='chat' ref={messageRef} />
				<button>send</button>
			</form>
			<button onClick={handlelike}>LIKE</button>
			{/* <button onClick={handleLeave}>leave</button> */}
			<p> room {room}</p>
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
			{list.map((value, index) => {
				console.log(value);
				return (
					<div key={index}>
						<p style={{ color: "orange" }}>{value.user_id}</p>
						<p>{value.msg}</p>
					</div>
				);
			})}
		</section>
	);
};

export default Chat;

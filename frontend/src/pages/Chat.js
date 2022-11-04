import React, { useEffect, useRef, useState, useContext } from "react";
import io from "socket.io-client";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { Link, useParams } from "react-router-dom";

const socket = io("http://localhost:8000", { query: { id: "1234" } });
const Chat = () => {
	const { user, setUser } = useContext(AuthContext);
	const params = useParams();
	const [currentUser, setCurrentUser] = useState({});
	const [room, setRoom] = useState("");
	const [list, setList] = useState([]);
	const [match, setMatched] = useState({});
	console.log(match);
	const messageRef = useRef();
	useEffect(() => {
		setCurrentUser(user);
		if (params.id !== undefined || null) {
			setRoom(params.id);
			socket.emit("join_room", params.id);
			axios
				.post("http://localhost:8000/getchat", { room_id: params.id })
				.then((res) => {
					setList(res.data.text)
				});
		}
		socket.on("recived_msg", (data) => {
			setList((prev) => [...prev, data]);
		});
		socket.on("joined_room", (roomId, user) => {
			setRoom(roomId);
		});
	}, []);

	const handleSend = (e) => {
		console.log("yes");
		e.preventDefault();
		socket.emit("send_msg", {
			data: {
				msg: messageRef.current.value,
				username: currentUser.username,
				user_id: currentUser.user_id,
			},
			roomId: params.id,
		});
		axios
			.post("http://localhost:8000/savechat", {
				newText: {
					msg: messageRef.current.value,
					username: currentUser.username,
					user_id: currentUser.user_id,
				},
				room_id: params.id,
			})
			// .then((res) => {});
		messageRef.current.value = "";
	};

	return (
		<section>
			<form onSubmit={handleSend}>
				<input type='text' placeholder='chat' ref={messageRef} />
				<button>send</button>
			</form>
			<Link to={"/login"}>login</Link>
			<Link to={"/chatlist"}>list</Link>
			<p> room {room}</p>
			<p> user {currentUser.username}</p>
			<div>
				{" "}
				matched User
				<p>name : {match.username}</p>
			</div>
			{list.map((value, index) => {;
				return (
					<div key={index}>
						<p style={{ color: "orange" }}>{value.username}</p>
						<p>{value.msg}</p>
					</div>
				);
			})}
		</section>
	);
};

export default Chat;

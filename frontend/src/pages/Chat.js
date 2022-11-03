import { List } from "@mui/material";
import React, { useEffect, useRef, useState, useContext } from "react";
import io from "socket.io-client";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const socket = io("http://localhost:8000", { query: { id: "1234" } });
const Chat = () => {
	const { user, setUser } = useContext(AuthContext);
	// useEffect(() => {
	// 	const roomId = "assjkdfw3u4ifiale";
	// 	socket.emit("join_room", roomId);
	// }, []);
	const [currentUser, setCurrentUser] = useState({});
	console.log("now", currentUser);

	const [room, setRoom] = useState("");
	const [list, setList] = useState([]);
	console.log("list", list);
	// const [user, setUser] = useState("");
	const [msgUser, setMagUser] = useState("");
	const [match, setMatched] = useState({});
	console.log(match);
	const messageRef = useRef();
	useEffect(() => {
		axios
			.post("http://localhost:8000/checklike", {
				user_id: currentUser.user_id,
			})
			.then((res) => {
				console.log("chekLike", res.data);
				if (res.data.length > 0) {
					setMatched(res.data[0].userInfo);
					setRoom(res.data[0].createdChat._id);
					socket.emit("join_room", res.data[0].createdChat._id);
				}
			});
	},[currentUser.user_id]);
	useEffect(() => {
		setCurrentUser(user);
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
	const handleSend = (e) => {
		e.preventDefault();
		socket.emit("send_msg", {
			msg: messageRef.current.value,
			username: currentUser.username,
		});
		messageRef.current.value = "";
	};
	// const handleLeave = () => {
	// 	setUser("");
	// 	socket.emit("disconnect");
	// };
	const handlelike = () => {
		if (currentUser.username === "Rachel") {
			axios
				.post("http://localhost:8000/sendlike", {
					from: currentUser.user_id,
					to: "635c1acb1b5bf56ef76010ba",
				})
				.then((res) => {
					console.log("like", res);
					if (res.data.userInfo !== undefined) {
						setMatched(res.data.userInfo);
						setRoom(res.data.createdChat._id);
						socket.emit("join_room", res.data.createdChat._id);
					}
				});
		} else {
			axios
				.post("http://localhost:8000/sendlike", {
					from: currentUser.user_id,
					to: "635c1b0f1b5bf56ef76010c0",
				})
				.then((res) => {
					console.log("like", res);
					if (res.data.userInfo !== undefined) {
						setMatched(res.data.userInfo);
						setRoom(res.data.createdChat._id);
						socket.emit("join_room", res.data.createdChat._id);
					}
				});
		}
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
			</div>
			{list.map((value, index) => {
				console.log(value);
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

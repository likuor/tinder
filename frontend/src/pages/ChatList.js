import { List } from "@mui/material";
import React, { useEffect, useRef, useState, useContext, } from "react";
import io from "socket.io-client";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";

const socket = io("http://localhost:8000", { query: { id: "1234" } });
const ChatList = () => {
	const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);
	const [room, setRoom] = useState("");
  
	console.log("user", user);
  const [chat, setChat] = useState([]);
  useEffect(() => {
    setCurrentUser(user)
		axios
			.post("http://localhost:8000/getchatlist", {
				user_id: user.user_id,
			})
			.then((res) => {
        console.log("chekLike", res.data);
        setRoom(res.data[0].createdChat._id);
        setChat(res.data)
			});
	}, [user.user_id]);

	const [currentUser, setCurrentUser] = useState({});
	console.log("now", currentUser);
	// const [user, setUser] = useState("");
	// const handleLeave = () => {
	// 	setUser("");
	// 	socket.emit("disconnect");
	// };
	const handlelike = () => {
		axios
			.post("http://localhost:8000/sendlike", {
				from: currentUser.user_id,
				to: "6364005204c4d5b81220fe46",
			})
			.then((res) => {
        console.log("like", res);
        // if (chat.length > 0) return setRoom(res.data.createdChat._id);
				navigate(`/chat/room=${res.data.createdChat._id}`);
			});
	};
	return (
		<section>
			<button onClick={handlelike}>LIKE</button>
			<Link to={"/login"}>login</Link>
			{/* <button onClick={handleLeave}>leave</button> */}
			<p> user {currentUser.username}</p>
			{chat.map((value, index) => {
				return (
					<div key={index} style={{ display: "flex" }}>
						<Link to={`/chat/room=${room}`}>
							<p style={{ padding: "0 10px 0 10px" }}>
								{value.userInfo.username}
							</p>
						</Link>
						<p>{value.createdChat.text}</p>
					</div>
				);
			})}
		</section>
	);
};

export default ChatList;


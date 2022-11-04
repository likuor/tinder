import { List } from "@mui/material";
import React, { useEffect, useRef, useState, useContext } from "react";
import io from "socket.io-client";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";

const ChatList = () => {
	const navigate = useNavigate();
	const { user, setUser } = useContext(AuthContext);
	const [chat, setChat] = useState([]);
	useEffect(() => {
		setCurrentUser(user);
		axios
			.post("http://localhost:8000/getchatlist", {
				user_id: user.user_id,
			})
			.then((res) => {
				setChat(res.data);
			});
	}, [user.user_id]);

	const [currentUser, setCurrentUser] = useState({});
	const handlelike = () => {
		axios
			.post("http://localhost:8000/sendlike", {
				from: currentUser.user_id,
				to: "6364005204c4d5b81220fe46",
			})
			.then((res) => {
				navigate(`/chat/room=${res.data.createdChat._id}`);
			});
	};
	return (
		<section>
			<button onClick={handlelike}>LIKE</button>
			<Link to={"/login"}>login</Link>
			<p> user {currentUser.username}</p>
			{chat.map((value, index) => {
				return (
					<div key={index} style={{ display: "flex" }}>
						<Link to={`/chat/room=${value.createdChat._id}`}>
							<p style={{ padding: "0 10px 0 10px" }}>
								{value.userInfo.username}
							</p>
						</Link>
						<p>
							{value.createdChat.text.length > 0
								? value.createdChat.text[value.createdChat.text.length - 1].msg
								: "Let's chat"}
						</p>
					</div>
				);
			})}
		</section>
	);
};

export default ChatList;

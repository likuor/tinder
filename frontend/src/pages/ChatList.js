import { List } from "@mui/material";
import React, { useEffect, useRef, useState, useContext } from "react";
import io from "socket.io-client";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const socket = io("http://localhost:8000", { query: { id: "1234" } });
const ChatList = () => {
	const { user, setUser } = useContext(AuthContext);
	console.log("user", user);
  const [chat, setChat] = useState([]);
	useEffect(() => {
		axios
			.post("http://localhost:8000/getchatlist", {
				user_id: user.user_id,
			})
			.then((res) => {
        console.log("chekLike", res.data);
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
				from: "635c1b0f1b5bf56ef76010c0",
				to: "635c1acb1b5bf56ef76010ba",
			})
			.then((res) => {
				console.log("like", res);
			});
	};
	return (
		<section>
			<button onClick={handlelike}>LIKE</button>
			{/* <button onClick={handleLeave}>leave</button> */}
			<p> user {currentUser.username}</p>
      {chat.map((value,index) => {
        return (
					<div key={index} style={{ display: "flex" }}>
						<p style={{ padding: "0 10px 0 10px" }}>
							{value.userInfo.username}
						</p>
						<p>{value.createdChat.text}</p>
					</div>
				);
      })
    }
		</section>
	);
};

export default ChatList;


import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import ChatroomLayout from "../Layout/ChatroomLayout";
import { Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import userImageAtsu from "../image/userImages/rachel.jpg";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@mui/material/Paper";

const socket = io("http://localhost:8000", { query: { id: "1234" } });

const Chatroom = () => {
	const params = useParams();
	const [currentUser, setCurrentUser] = useState({});
	const [room, setRoom] = useState("");
	const [list, setList] = useState([]);
	const [image, setImage] = useState("");
	const messageRef = useRef(null);
	const location = useLocation();
	const { matchedUserName } = location.state;

	useEffect(() => {
		const baseURL = "http://localhost:8000";
		const fetchData = async () => {
			await axios
				.get(`${baseURL}/getuserinfo`, { withCredentials: true })
				.then((response) => {
					setCurrentUser(response.data);
					if (params.id !== undefined || null) {
						setRoom(params.id);
						socket.emit("join_room", params.id);
						axios
							.post(`${baseURL}/getchat`, { room_id: params.id })
							.then((res) => {
								setList(res.data.text);
								if (res.data.user1 === response.data._id) {
									axios
										.post(`${baseURL}/userimage`, {
											user_id: res.data.user2,
										})
										.then((res) => {
											setImage(res.data);
										});
								} else {
									axios
										.post(`${baseURL}/image`, {
											user_id: res.data.user1,
										})
										.then((res) => {
											setImage(res.data);
										});
								}
							});
					}
				});
		};
		fetchData();
		socket.on("recived_msg", (data) => {
			setList((prev) => [...prev, data]);
		});
		socket.on("joined_room", (roomId, user) => {
			setRoom(roomId);
		});
	}, []);

	const handleSend = (e) => {
		e.preventDefault();
		socket.emit("send_msg", {
			data: {
				msg: messageRef.current.value,
				username: currentUser.username,
				user_id: currentUser.user_id,
			},
			roomId: params.id,
		});
		axios.post("http://localhost:8000/savechat", {
			newText: {
				msg: messageRef.current.value,
				username: currentUser.username,
				user_id: currentUser.user_id,
			},
			room_id: params.id,
		});
		// .then((res) => {});
		messageRef.current.value = "";
	};
	// const handleEnter = (e) => {
	// 	console.log(e.key === "Enter");
	// 	if (e.key === "Enter") return handleSend(e);
	// };

	return (
		<>
			{/* Header showing user */}
			<Paper
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					mx: "auto",
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					zIndex: 100,
				}}
			>
				<Avatar
					alt={`Avatar n??${1}`}
					src={image}
					sx={{ m: 1, width: 56, height: 56 }}
				/>
				<Typography variant='body1'>{matchedUserName}</Typography>
			</Paper>
			{/* Chatting area */}
			<ChatroomLayout>
				<Box>
					{list.map((message, index) => {
						return (
							<Grid container spacing={2} key={index}>
								{message.username === currentUser.username ? (
									<Grid item xs={12} key={index}>
										<Box
											sx={{
												display: "flex",
												justifyContent: "flex-end",
											}}
										>
											<Box
												sx={{
													wordBreak: "break-word",
													fontSize: "14px",
													padding: "0.5rem",
													borderTopLeftRadius: 50,
													borderTopRightRadius: 50,
													borderBottomLeftRadius: 50,
													backgroundColor: "#273885",
													color: "white",
												}}
											>
												<Typography align={"right"}>{message.msg}</Typography>
											</Box>
										</Box>
									</Grid>
								) : (
									<>
										<Grid item xs={2}>
											{message.username !== currentUser.username ? (
												<Avatar alt={`Avatar n??${1}`} src={image} />
											) : (
												""
											)}
										</Grid>
										<Grid item xs={10}>
											<Box
												key={index}
												sx={{
													display: "inline-block",
													wordBreak: "break-word",
													fontSize: "14px",
													padding: "0.5rem",
													borderTopRightRadius: 50,
													borderTopLeftRadius: 50,
													borderBottomRightRadius: 50,
													backgroundColor: "#F5F5F5",
												}}
											>
												<Typography align={"left"}>{message.msg}</Typography>
											</Box>
										</Grid>
									</>
								)}
							</Grid>
						);
					})}
				</Box>
				{/* Send form */}
				<Container
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						mx: "auto",
						position: "fixed",
						bottom: 50,
						left: 0,
						right: 0,
						background: "white",
						paddingBottom: "1rem",
					}}
				>
					<Grid
						container
						direction='row'
						justifyContent='space-around'
						alignItems='center'
					>
						<Grid item xs={9}>
							<TextField
								fullWidth
								type='text'
								size='small'
								inputRef={messageRef}
								// onKeyDown={handleEnter}
							/>
						</Grid>
						<Grid item xs={2}>
							<Button variant='contained' color='primary' onClick={handleSend}>
								Send
							</Button>
						</Grid>
					</Grid>
				</Container>
			</ChatroomLayout>
		</>
	);
};

export default Chatroom;

import React, { useState, useContext, useEffect } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Pill from "./Pill";
import Stack from "@mui/material/Stack";
import CardActions from "@mui/material/CardActions";
import BasicButton from "./BasicButton";
import userImageAtsu from "../image/userImages/test.jpg";
import { AuthContext } from "../AuthContext";
import axios from "axios";

const ExpandInfo = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(360deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

const ItmeCard = ({ usersLength, userData, usersIndex, setusersIndex }) => {
	const { user } = useContext(AuthContext);
	const [expanded, setExpanded] = useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const showNextUser = () => {
		if (usersIndex < usersLength) {
			const baseURL = `${process.env.REACT_APP_SERVER_URL}/sendlike`;
			const sendInfo = { to: userData._id };
			axios.post(baseURL, sendInfo, { withCredentials: true });
			return setusersIndex(usersIndex + 1);
		} else {
			return alert("No more users!");
		}
	};
	const [image, setImage] = useState("");
	useEffect(() => {
		const baseURL = `${process.env.REACT_APP_SERVER_URL}/userimage`;
		axios
			.post(baseURL, { user_id: userData?._id }, { withCredentials: true })
			.then((res) => {
				setImage(res.data);
			});
	}, [usersIndex]);
	return (
		<>
			<Card
				sx={{ maxWidth: 345, mx: "auto", my: "1.3rem" }}
				key={userData?._id}
			>
				<ImageListItem>
					<img
						src={image}
						srcSet={image}
						alt={`${userData?.username} pic`}
						loading='lazy'
					/>
					<ImageListItemBar
						title={`${userData?.username} ${userData?.age} `}
						subtitle={userData?.course}
						actionIcon={
							<ExpandInfo
								sx={{ color: "rgba(255, 255, 255, 0.54)" }}
								expand={expanded}
								aria-expanded={expanded}
								aria-label='show more'
								onClick={handleExpandClick}
							>
								{!expanded ? (
									<InfoIcon />
								) : (
									<InfoIcon sx={{ color: "#f8f8f8" }} />
								)}
							</ExpandInfo>
						}
					/>
				</ImageListItem>

				<CardContent>
					<CardActions
						disableSpacing
						sx={{
							justifyContent: "space-around",
						}}
					>
						<BasicButton text='no' />
						<BasicButton text='like' onClick={() => showNextUser()} />
					</CardActions>
					<Collapse in={expanded} timeout='auto' unmountOnExit>
						<Typography variant='h1'>About me</Typography>
						<Typography variant='body1'>{userData?.about}</Typography>
						<Typography variant='h1'>My Interests</Typography>
						<Stack direction='row' spacing={1} sx={{ mr: 0.3 }}>
							{userData?.interests?.map((interest, index) => {
								return <Pill text={interest.hobby} key={interest.id} />;
							})}
						</Stack>
					</Collapse>
				</CardContent>
			</Card>
		</>
	);
};

export default ItmeCard;

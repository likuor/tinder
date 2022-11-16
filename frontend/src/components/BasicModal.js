import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import BoxLayout from "../Layout/BoxLayout";
import axios from "axios";
import { courses, genders, sexualOrientations } from "../Data/SelectBoxOptions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));
function BootstrapDialogTitle(props) {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label='close'
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
}
BootstrapDialogTitle.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
};

export default function BasicModal(props) {
	const { open, setOpen, user, setUser } = props;
	const nameRef = useRef(null);
	const aboutRef = useRef(null);
	const courseRef = useRef(null);
	const genderRef = useRef(null);
	const ageRef = useRef(null);

	// image
	const [selectedImage, setSelectedImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);

	// set interests data from db
	const [interestsData, setInterestsData] = useState([]);

	// these data are from file
	const [course, setCourse] = useState("NONE");
	const [gender, setGender] = useState(0);
	const [interests, setInterests] = useState([]);
	const [inputInterestsVal, setInputInterestsVal] = useState("");
	const [sexualOri, setSexualOri] = useState([]);
	const [inputSexualOriVal, setInputSexualOriVal] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get(`${process.env.REACT_APP_SERVER_URL}/interests`)
				.then((response) => {
					axios
						.get(`${process.env.REACT_APP_SERVER_URL}/getuserinfo`, {
							withCredentials: true,
						})
						.then((res) => {
							setInterestsData(response.data);
							setCourse(res.data?.course);
							setGender(res.data?.gender);
							setSexualOri(res.data?.sexual_orientation);
							setInterests(res.data?.interests);
						});
				});

			if (selectedImage) {
				setImageUrl(URL.createObjectURL(selectedImage));
			}
		};

		fetchData();
	}, [selectedImage, user]);

	const handleCloseModal = () => {
		setOpen(false);

		const updatedSexualOri = sexualOri?.map((chosenSex) => chosenSex);
		const UpdatedInterests = interests?.map(
			(chosenInterests) => chosenInterests
		);

		const userInfo = {
			_id: user._id,
			email: user.email,
			username: nameRef.current.value,
			// image: imageUrl,
			about: aboutRef.current.value,
			age: Number(ageRef.current.value),
			course: courseRef.current.value,
			gender: genderRef.current.value,
			interests: UpdatedInterests,
			sexual_orientation: updatedSexualOri,
		};
		const placedUserInfo = JSON.stringify(user);
		const updatedUserInfo = JSON.stringify(userInfo);
		const formData = new FormData();
		formData.append("image", selectedImage);
		formData.append("userInfo", updatedUserInfo);

		if (placedUserInfo !== updatedUserInfo) {
			const baseURL = "http://localhost:8000/setting";
			axios
				.post(baseURL, formData, {
					headers: { "Content-Type": "multipart/form-data" },
				})
				.then((res) => {
					setUser(userInfo);
				});
		}
	};

	const handleState = (event, setState) => {
		setState(event.target.value);
	};

	return (
		<>
			<BootstrapDialog
				onClose={handleCloseModal}
				aria-labelledby='customized-dialog-hobby'
				open={open}
			>
				<BootstrapDialogTitle
					id='customized-dialog-hobby'
					onClose={handleCloseModal}
					sx={{
						width: 310,
					}}
				>
					Edit
				</BootstrapDialogTitle>
				<DialogContent dividers>
					{/* image */}
					<BoxLayout>
						<Button variant='contained' component='label'>
							Upload image
							<input
								type='file'
								hidden
								onChange={(e) => setSelectedImage(e.target.files[0])}
							/>
						</Button>
						{imageUrl && selectedImage && (
							<Box mt={2} textAlign='center'>
								<img src={imageUrl} alt={selectedImage.name} height='100px' />
							</Box>
						)}
					</BoxLayout>

					{/* username */}
					<BoxLayout>
						<TextField
							id='standard-multiline-static'
							inputRef={nameRef}
							label='Name'
							// value={user?.username}
							defaultValue={user?.username}
							placeholder='Your name'
							variant='standard'
						/>
					</BoxLayout>

					{/* age */}
					<BoxLayout>
						<TextField
							id='standard-multiline-static'
							type='number'
							inputRef={ageRef}
							InputProps={{ inputProps: { min: 1, max: 2 } }}
							label='Age'
							defaultValue={user?.age}
							placeholder='Your age'
							variant='standard'
						/>
					</BoxLayout>

					{/* about */}
					<BoxLayout>
						<TextField
							id='standard-multiline-static'
							inputRef={aboutRef}
							label='About me'
							multiline
							rows={10}
							defaultValue={user?.about}
							placeholder='Tell us about yourself'
							variant='standard'
						/>
					</BoxLayout>

					{/* Interests  */}
					<BoxLayout>
						<Autocomplete
							multiple
							sx={{ width: 260 }}
							limitTags={5}
							name='interests'
							id='multiple-interests'
							options={interestsData}
							getOptionLabel={(option) => option.hobby}
							value={interests}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							defaultValue={user?.interests}
							onChange={(event, newValue) => {
								setInterests(newValue);
							}}
							inputValue={inputInterestsVal}
							onInputChange={(event, newInputValue) => {
								setInputInterestsVal(newInputValue);
							}}
							renderInput={(params) => (
								<TextField
									name='auto-input'
									{...params}
									label='Select your interests'
									placeholder='Interests'
								/>
							)}
						/>
					</BoxLayout>

					{/* courses */}
					<BoxLayout>
						<TextField
							id='outlined-select-currency'
							select
							label='Course'
							value={course}
							defaultValue={user?.course}
							inputRef={courseRef}
							onChange={(e) => handleState(e, setCourse)}
						>
							{courses.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</BoxLayout>

					{/* gendr */}
					<BoxLayout>
						<TextField
							id='outlined-select-currency'
							select
							inputRef={genderRef}
							label='Gender'
							value={gender}
							defaultValue={user?.gender}
							onChange={(e) => handleState(e, setGender)}
						>
							{genders.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</BoxLayout>
					{/* sexual orieantation */}
					<BoxLayout>
						<Autocomplete
							multiple
							sx={{ width: 260 }}
							limitTags={5}
							name='sexualOrientation'
							id='multiple-sexualOrientation'
							options={sexualOrientations}
							getOptionLabel={(option) => option.label}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							value={sexualOri}
							defaultValue={user?.sexual_orientation}
							onChange={(event, newValue) => {
								setSexualOri(newValue);
							}}
							inputValue={inputSexualOriVal}
							onInputChange={(event, newInputValue) => {
								setInputSexualOriVal(newInputValue);
							}}
							renderInput={(params) => (
								<TextField
									name='auto-input'
									{...params}
									label='Select your Sexual Orientation'
									placeholder='Sexual Orientation'
								/>
							)}
						/>
					</BoxLayout>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleCloseModal}>
						Save changes
					</Button>
				</DialogActions>
			</BootstrapDialog>
		</>
	);
}

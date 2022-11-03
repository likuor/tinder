import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import BoxLayout from '../Layout/BoxLayout';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { courses, genders, sexualOrientations } from '../Data/SelectBoxOptions';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
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
            position: 'absolute',
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
  const { user, setUser } = useContext(AuthContext);
  const { open, setOpen } = props;
  const nameRef = useRef(null);
  const aboutRef = useRef(null);
  const courseRef = useRef(null);
  const genderRef = useRef(null);
  const ageRef = useRef(null);

  // image
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // the data are from file and set user's info
  const [course, setCourse] = useState(user?.course);
  const [gender, setGender] = useState(user?.gender);
  const [interests, setInterests] = useState(user?.interests);
  const [inputInterestsVal, setInputInterestsVal] = useState('');
  const [sexualOri, setSexualOri] = useState(user?.sexual_orientation);
  const [inputSexualOriVal, setInputSexualOriVal] = useState('');

  // set interests data from db
  const [interestsData, setInterestsData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/interests').then((response) => {
      setInterestsData(response.data);
    });

    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage, user]);

  const handleCloseModal = () => {
    setOpen(false);

    const sexualOriResult = sexualOri.map((sexOri) => sexOri);
    const interestsResult = interests.map((interest) => interest);
    const userInfo = {
      user_id: user.user_id,
      email: user.email,
      username: nameRef.current.value,
      // image: imageUrl,
      about: aboutRef.current.value,
      age: Number(ageRef.current.value),
      course: courseRef.current.value,
      gender: genderRef.current.value,
      interests: interestsResult,
      sexual_orientation: sexualOriResult,
    };

    const placedUserInfo = JSON.stringify(user);
    const updatedUserInfo = JSON.stringify(userInfo);

    if (placedUserInfo !== updatedUserInfo) {
      const baseURL = 'http://localhost:8000/setting';
      axios.post(baseURL, userInfo).then((res) => {
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
              defaultValue={user?.sexualOri}
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

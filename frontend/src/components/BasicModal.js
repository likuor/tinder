import React, { useState, useEffect, useRef } from 'react';
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

////////////////////////// dummy //////////////////////////
const courses = [
  {
    value: 'NONE',
    label: 'Not chosen',
  },
  {
    value: 'CRS',
    label: 'Customer Relations Specialist',
  },
  {
    value: 'HM',
    label: 'Hospitality Management',
  },
  {
    value: 'IBM',
    label: 'International Business Management',
  },
  {
    value: 'UI/UX',
    label: 'UI/UX Design',
  },
  {
    value: 'NSSS',
    label: 'Network and System Solutions Specialist',
  },
  {
    value: 'DMS',
    label: 'Digital Marketing Specialit',
  },
  {
    value: 'WMAD',
    label: 'Web and Mobile App Development',
  },
];

const genders = [
  {
    value: 0,
    label: 'Not chosen',
  },
  {
    value: 1,
    label: 'Male',
  },
  {
    value: 2,
    label: 'Female',
  },
  {
    value: 3,
    label: 'X',
  },
];

const sexualOrientations = [
  {
    value: 1,
    label: 'Male',
  },
  {
    value: 2,
    label: 'Female',
  },
  {
    value: 3,
    label: 'X',
  },
  {
    value: 4,
    label: 'Everyone',
  },
];
////////////////////////// dummy //////////////////////////

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
  const { open, setOpen } = props;
  const [course, setCourse] = useState('NONE');
  const [gender, setGender] = useState(0);
  const [about, setAbout] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState();

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [interests, setInterests] = useState([]);
  const [inputInterestsVal, setInputInterestsVal] = useState('');

  const [sexualOri, setSexualOri] = useState([]);
  const [inputSexualOriVal, setInputSexualOriVal] = useState('');

  const nameRef = useRef(null);
  const aboutRef = useRef(null);
  const courseRef = useRef(null);
  const genderRef = useRef(null);
  const ageRef = useRef(null);
  // const interestsRef = useRef(null);
  // const sexualOrientationRef = useRef(null);
  const [interestsData, setInterestsData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/interests').then((response) => {
      setInterestsData(response.data);
    });

    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const handleClose = () => {
    setOpen(false);
    setAbout(aboutRef.current.value);
    setName(nameRef.current.value);
    setAge(ageRef.current.value);
    const sexualOriResult = sexualOri.map((sexOri) => sexOri.value);
    const interestsResult = interests.map((interest) => interest.hobby);
    const ageNum = Number(ageRef.current.value);

    const userInfo = {
      user_id: '6358716edc1edc7c8a8e7457',
      username: nameRef.current.value,
      // image: imageUrl,
      course: courseRef.current.value,
      about: aboutRef.current.value,
      interests: interestsResult,
      gender: genderRef.current.value,
      sexual_orientation: sexualOriResult,
      age: ageNum,
    };

    const baseURL = 'http://localhost:8000/setting';
    axios.post(baseURL, userInfo);
  };

  const handleState = (event, setState) => {
    setState(event.target.value);
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-hobby'
        open={open}
      >
        <BootstrapDialogTitle
          id='customized-dialog-hobby'
          onClose={handleClose}
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
              defaultValue={name}
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
              defaultValue={age}
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
              defaultValue={about}
              placeholder='Tell us about yourself'
              variant='standard'
            />
          </BoxLayout>

          {/* Interests  */}
          <BoxLayout>
            <Autocomplete
              multiple
              sx={{ width: 260 }}
              limitTags={2}
              name='interests'
              id='multiple-interests'
              options={interestsData}
              getOptionLabel={(option) => option.hobby}
              value={interests}
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
              limitTags={2}
              name='sexualOrientation'
              id='multiple-sexualOrientation'
              options={sexualOrientations}
              getOptionLabel={(option) => option.label}
              value={sexualOri}
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
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

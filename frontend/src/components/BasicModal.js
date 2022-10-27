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

////////////////////////// dummy //////////////////////////
const top100Films = [{ hobby: 'coffee' }, { hobby: 'The Godfather' }];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const courses = [
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
];
////////////////////////// dummy //////////////////////////

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
  const [course, setCourse] = useState('CRS');
  const [gender, setGender] = useState(1);
  const [about, setAbout] = useState('');

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [interests, setInterests] = React.useState([]);
  const [inputInterestsVal, setInputInterestsVal] = React.useState('');

  const [sexualOri, setSexualOri] = React.useState([]);
  const [inputSexualOriVal, setInputSexualOriVal] = React.useState('');

  const aboutRef = useRef(null);
  const courseRef = useRef(null);
  const genderRef = useRef(null);
  // const interestsRef = useRef(null);
  // const sexualOrientationRef = useRef(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const handleClose = () => {
    setOpen(false);
    setAbout(aboutRef.current.value);

    const userInfo = {
      image: imageUrl,
      course: courseRef.current.value,
      about: aboutRef.current.value,
      interests: interests,
      gender: genderRef.current.value,
      sexualOrientation: sexualOri,
    };

    console.log(userInfo);
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mx: 'auto',
              my: 1,
            }}
          >
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
          </Box>

          {/* about */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mx: 'auto',
              my: 3,
            }}
          >
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
          </Box>

          {/* Interests  */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mx: 'auto',
              my: 3,
            }}
          >
            <Autocomplete
              multiple
              sx={{ width: 260 }}
              limitTags={2}
              name='movies'
              id='multiple-limit-tags'
              options={top100Films}
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
          </Box>

          {/* courses */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mx: 'auto',
              my: 3,
            }}
          >
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
          </Box>

          {/* gendr */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mx: 'auto',
              my: 3,
            }}
          >
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
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mx: 'auto',
              my: 3,
            }}
          >
            <Autocomplete
              multiple
              sx={{ width: 260 }}
              limitTags={2}
              name='sexual'
              id='multiple-limit-tags'
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
                  placeholder='SexualOrientation'
                />
              )}
            />
          </Box>
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

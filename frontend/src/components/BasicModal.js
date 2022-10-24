import React, { useState } from 'react';
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
    value: 'male',
    label: 'Male',
  },
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'X',
    label: 'X',
  },
];

const sexualOrientation = [
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'X',
    label: 'X',
  },
];

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

  const handleClose = () => {
    setOpen(false);
  };
  const handleCourse = (event) => {
    setCourse(event.target.value);
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
          sx={{
            width: 310,
          }}
        >
          Edit
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mx: 'auto',
              my: 1,
            }}
          >
            <TextField
              id='standard-multiline-static'
              label='About me'
              multiline
              rows={10}
              defaultValue='Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla.'
              variant='standard'
            />
          </Box>

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
              onChange={handleCourse}
            >
              {courses.map((option) => (
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
            <TextField
              id='outlined-select-currency'
              select
              label='Gender'
              value={'male'}
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
            <TextField
              id='outlined-select-currency'
              select
              label='Sex Orientation'
              value={'male'}
            >
              {sexualOrientation.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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

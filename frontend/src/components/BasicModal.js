import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ChildModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Fade in={open}>
          <Box sx={{ ...style, width: 200 }}>
            <h2 id='child-modal-title'>Text in a child modal</h2>
            <p id='child-modal-description'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
            <Button onClick={handleClose}>Close Child Modal</Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default function BasicModal(props) {
  const { open, setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={{ ...style, width: 400 }}>
            <h2 id='parent-modal-title'>Text in a modal</h2>
            <p id='parent-modal-description'>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
            <ChildModal />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

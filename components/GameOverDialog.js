import React, {useState} from 'react';
import {
   Button,
   Dialog,
   DialogActions,
   Slide,
   Stack,
   TextField,
   Box,
   Typography,
   Paper
} from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
   const { isGameOver, setGameOver, gameOverMessage } = props

  const handleClose = () => {
    setGameOver(false);
  };

  return (
      <Dialog
        open={isGameOver}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogActions sx={{margin: '15px'}} >
           GameOver!!
           <div>
               {gameOverMessage}
           </div>
        </DialogActions>
      </Dialog>
  );
}

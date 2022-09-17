import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
   return <Slide {...props} direction="up" />;
 }

export default function mySnackbar(props) {

   const { snackbar, setSnackbar } = props;

  const handleClose = () => {
   setSnackbar({open : false, message: ""});
  };

  return (
      <Snackbar
         autoHideDuration={6000}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         open={snackbar.open}
         onClose={handleClose}
         message={snackbar.message}
         TransitionComponent={TransitionUp}
      />
  );
}

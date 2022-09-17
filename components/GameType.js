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
   const { time, setTime } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

   const handleClick = (time) => {
      setTime(time);
      handleClose();
   }

   const handleFormSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      handleClick(`${data.get('min')}:${data.get('sec')}:${data.get('inc')}`);
   }

   const timeArray = time.split(':')

  return (
    <div>
       <Stack spacing={5} >
          <Paper elevation={24} sx={{ textAlign: 'center', height: 60, lineHeight: '60px', fontWeight: '700', fontSize: '20px'}} >
               {`${timeArray[0]} min : ${timeArray[1]} sec : ${timeArray[2]} inc`}
          </Paper>
         <Button variant="contained" onClick={handleClickOpen} fullWidth size='large' >
            Customize Time
         </Button>
       </Stack>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogActions sx={{margin: '15px'}} >
           <Stack spacing={3}>
               <Stack direction='row' spacing={2} justifyContent="center" alignItems="center" >
                  <Button variant='contained' color='secondary' onClick={() => handleClick("10:00:00")}>10min | 0inc</Button>
                  <Button variant='contained' color='secondary' onClick={() => handleClick("15:00:10")}>15min | 10inc</Button>
                  <Button variant='contained' color='secondary' onClick={() => handleClick("15:00:15")}>30min | 15inc</Button>
               </Stack>
               <Stack direction='row' spacing={2} justifyContent="center" alignItems="center" >
                  <Button variant='contained' color='secondary' onClick={() => handleClick("5:00:00")}>5min | 0inc</Button>
                  <Button variant='contained' color='secondary' onClick={() => handleClick("3:00:00")}>3min | 0inc</Button>
                  <Button variant='contained' color='secondary' onClick={() => handleClick("3:00:02")}>3min | 2inc</Button>
               </Stack>
               <Stack direction='row' spacing={2} justifyContent="center" alignItems="center" >
                  <Button variant='contained' color='secondary' onClick={() => handleClick("1:00:00")}>1min | 0inc</Button>
                  <Button variant='contained' color='secondary' onClick={() => handleClick("2:00:00")}>2min | 0inc</Button>
                  <Button variant='contained' color='secondary' onClick={() => handleClick("1:00:01")}>1min | 1inc</Button>
               </Stack>
               <Box component="form" noValidate onSubmit={handleFormSubmit}>
                  <Stack spacing={2} direction='row' justifyContent="center" alignItems="center" >
                  <TextField size='small' label='minute' name='min' sx={{width: '70px'}} />
                  <TextField size='small' label='second' name='sec' sx={{width: '70px'}} />
                  <TextField size='small' label="increment" name='inc' sx={{width: '70px'}} />
                  <Button variant='contained' type='submit' >set</Button>
                  </Stack>
               </Box>
           </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}

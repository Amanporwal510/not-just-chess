import React, { useState, useContext } from 'react';
import {
   Box,
   Card,
   CardContent,
   CardMedia,
   IconButton,
   Typography,
   Stack,
   Divider
} from '@mui/material';

import MicOffRoundedIcon from '@mui/icons-material/MicOffRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import VideocamOffRoundedIcon from '@mui/icons-material/VideocamOffRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';

import Timer from './Timer';

export default function VideoBox(props) {

   const { camera, microphone, toggleCamera, toggleMicrophone, videoRef, stream, myInfo } = props;

   const handleToggleCamera = () => {
      // if(stream && myInfo) { stream.getTracks()[0].stop(); }
      if(stream && myInfo) {
         stream.getVideoTracks().forEach(track => track.enabled = !camera);
      }
      if(camera) { videoRef.current.pause() }
      else { videoRef.current.play() }
      toggleCamera();
   }

   const handleToggleMicrophone = () => {
      // if(stream && myInfo) { stream.getTracks()[0].stop(); }
      if(stream && myInfo) {
         stream.getAudioTracks().forEach(track => track.enabled = !microphone);
      }
      videoRef.current.muted = !microphone
      toggleMicrophone();
   }

   return (
    <Card sx={{ display: 'flex',  height: 200, width: 500 }}>
      <CardMedia
         component="video"
         sx={{ height: 200, width: 267, backgroundColor: '#f7f7f7' }}
         autoPlay={camera}
         muted={!microphone && !myInfo}
         ref={videoRef}
      />
      <Box  sx={{ display: 'flex', flexDirection: 'column', width: 100, flex: '1 0' }}>
         <CardContent sx={{height: '100%'}}>
            <Typography component="div" variant="h5">
               Live From Space
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
               Mac Miller
            </Typography>
         </CardContent>
         <Divider />
         <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2} p={1}
         >
            {/* <Timer initialMinute={1} initialSeconds={0} /> */}
            <IconButton onClick={handleToggleMicrophone} >
               { microphone ? <MicRoundedIcon/> : <MicOffRoundedIcon/> }
            </IconButton>
            <IconButton onClick={handleToggleCamera}>
               { camera ? <VideocamRoundedIcon/> : <VideocamOffRoundedIcon/> }
            </IconButton>
         </Stack>
      </Box>
   </Card>
   );
}
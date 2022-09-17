import React, { useEffect, useContext } from 'react';

import {
   Stack
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { socket } from '../connection/socket';
import useInputState from '../hooks/newInputState';
import Snackbar from '../components/Snackbar';

export default function ChatBox(props) {
   const { snackbar, setSnackbar, DataContext } = props

   const { gameInfo } = useContext(DataContext);
   const { opponentSocketId } = gameInfo;

   useEffect(() => {
      socket.removeAllListeners("chat-message");
      socket.on("chat-message", (options) => {
         console.log({ message: options.message })
         setSnackbar({open : true, message: options.message});
      });
   }, []);

   const [ message, setMessage, resetMessage ] = useInputState("");

   const handleSubmit = (event) => {
      event.preventDefault();
      console.log(message);
      socket.emit("chat-message", { message: message, to: opponentSocketId });
      resetMessage();
   }

   return <>
      <form onSubmit={handleSubmit} 
         style={{ width: '100%', height: '50px', borderRadius: '25px' }}
      >
         <Stack direction='row' justifyContent='center' alignItems='center'
            sx={{ width: '100%', height: '50px', borderRadius: '25px' , backgroundColor: '#f7f7f7' }} 
         >
            <input 
               value={message}
               onChange={setMessage}
               placeholder='Send message to your opponent'
               style={{width: '90%', height: '100%' , borderRadius: '25px', border: 'none', outline: 'none', padding: '2px', paddingLeft: '15px', fontSize: '15px', backgroundColor: '#f7f7f7'}} 
            />
            <SendIcon onClick={handleSubmit} sx={{ fontSize: '35px', color: message == "" ? '#dfdfdf' : "#6dade8"  }} />
         </Stack>
      </form>
      <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
   </>
}

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


import { socket } from '../connection/socket';

export const sendChallenge = async (color, user, opponentEmail, resetOpponentEmail) => {

   const { email, firstname, lastname } = user;
      
   // console.log(opponentEmail, color)
   let isWhite, gameId = uuidv4();

   if(color == "random") {
      isWhite = !!((Math.floor(Math.random()*10)-5)>0);
   }
   else if(color == "white") { isWhite = true; }
   else { isWhite =  false; }

   // setGameInfo({ ...gameInfo, isWhite, gameId })

   //createGame
   socket.emit('create-game', { gameId });

   // Send Challenge
   // console.log(email, firstname, lastname, color, gameInfo)
   axios.post('/api/challenge', {
      opponentEmail,
      myEmail: email,
      opponentName: firstname + " " + lastname,
      gameId,
      isWhite: !isWhite
   });
   
   resetOpponentEmail();
}
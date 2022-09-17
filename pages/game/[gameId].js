import React, { useEffect, useContext, useState } from "react";
import { useRouter } from 'next/router';
import * as ChessJS from "chess.js";
const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;
import { Chessboard } from "react-chessboard";

import { 
   Box,
   Stack,
} from '@mui/material';


import { socket } from '../../connection/socket';
import VideoChat from '../../components/VideoChat';
import ChatBox from '../../components/ChatBox';
import GameOverDialog from "../../components/GameOverDialog";

import {
   onDropUtil,
   makeOpponentMove
} from '../../methods/methodsOnGame';

export default function PlayRandomMoveEngine(props) {
   const router = useRouter()
   // const { gameId } = router.query

   const [game, setGame] = useState(new Chess());
   // const [time, setTime] = useState("10:00:00");
   const [ isGameOver, setGameOver ] = useState(false);
   const [ gameOverMessage, setGameOverMessage ] = useState("");
   const [ snackbar, setSnackbar ] = useState({
      open: false,
      message: ""
   });

   const { gameInfo } = useContext(props.DataContext);

   useEffect(() => {
      socket.removeAllListeners("opponent-move");
      socket.on('opponent-move', (move) => {
         console.log('opponent-move', move)
         makeOpponentMove(game, move, setGame, setGameOver, setGameOverMessage)
      });
    }, []);

   function onDrop(sourceSquare, targetSquare) {
      onDropUtil(game, sourceSquare, targetSquare, gameInfo, isGameOver, setGame, setGameOver, setGameOverMessage);
   }

   return (
      <>
      <Stack spacing={5} direction='row' alignItems="center" sx={{ height: '100vh', backgroundColor: '#191919', padding: '50px'}} >
         <Box sx={{borderRadius: '5px', overflow: 'hidden'}} >
            <Chessboard 
               position={game.fen()} 
               onPieceDrop={onDrop}
               boardWidth={520}
            />
         </Box>
         <Stack spacing={2} justifyContent="space-around" alignItems="center" sx={{ height: '520px', borderRadius: '5px'}} >
            <VideoChat {...props} /> 
            <ChatBox { ...props } snackbar={snackbar} setSnackbar={setSnackbar} />
         </Stack>
      </Stack>
      {
         isGameOver && <GameOverDialog
                           isGameOver={isGameOver} 
                           setGameOver={setGameOver}
                           gameOverMessage={gameOverMessage}
                        />
      }
      </>
  )
}
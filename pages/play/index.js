import React, { useEffect, useState } from "react";
import * as ChessJS from "chess.js";
const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;
import { Chessboard } from "react-chessboard";
import Router from 'next/router'
import GameType from "../../components/GameType";

import { 
   Box,
   Stack,
   Typography,
   TextField,
   Button,
   Paper,
   Radio,
   RadioGroup,
   FormControl,
   FormLabel,
   FormControlLabel
 } from '@mui/material';

import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';
import useInputState from '../../hooks/newInputState'

import {
   sendChallenge
} from '../../methods/methodsOnPlay'

export default function ChessIndex(props) {

   const [game, setGame] = useState(new Chess());
   // const [time, setTime] = useState("10:00:00");
   const { gameInfo, setGameInfo } = React.useContext(props.DataContext);
   const [ opponentEmail, handleChangeOpponentEmail, resetOpponentEmail ] = useInputState("");
   const [ color, handleChangeColor, resetColor ] = useInputState('random');

   const handleClick = () => {
      setGameInfo( (prevState) => {
         return {
            ...prevState,
            canStartGame: false
         }
      })
      const { gameId } = gameInfo;
      Router.push( `/game/${gameId}`);
   }

   return (
      <Stack direction='row' justifyContent="space-around" alignItems="center" sx={{ height: '100vh', backgroundColor: '#191919' }} >
         <Stack justifyContent="space-around" sx={{height: '520px'}} >
            <Box>
               <Box >
                  <AccountBoxSharpIcon sx={{ fontSize: '120px' }} />
               </Box>
               <Typography variant="h6" sx={{ color: '#FFF' }} >Aman Porwal</Typography>
            </Box>
            <Box>
               <Box >
                  <AccountBoxSharpIcon sx={{ fontSize: '120px' }} />
               </Box>
               <Typography variant="h6" sx={{ color: '#FFF' }} >Aman Porwal</Typography>
            </Box>
         </Stack>
         <Box sx={{borderRadius: '5px', overflow: 'hidden'}} >
            <Chessboard 
               position={game.fen()} 
               boardWidth={520}
            />
         </Box>
         <Stack spacing={3} sx={{ height: '520px', width: '350px', borderRadius: '5px'}} >
            {/* <Paper sx={{ padding: '5px' }} >
               <GameType time={time} setTime={setTime} />
            </Paper> */}
            <Paper sx={{ padding: '5px' }} >
               <Stack spacing={3} >
                  <TextField 
                     label={`opponent's email`}
                     variant="filled" 
                     fullWidth 
                     autoComplete='off'
                     value={opponentEmail}
                     onChange={handleChangeOpponentEmail}
                  />
                  <FormControl>
                     <FormLabel id="demo-radio-buttons-group-label">Send Challenge as (your color) :</FormLabel>
                     <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={color}
                        onChange={handleChangeColor}
                        name="radio-buttons-group"
                     >
                        <Stack direction='row' justifyContent='space-around' >
                           <FormControlLabel value="white" control={<Radio />} label="White" />
                           <FormControlLabel value="black" control={<Radio />} label="Black" />
                           <FormControlLabel value="random" control={<Radio />} label="Random" />
                        </Stack>
                     </RadioGroup>
                  </FormControl>
                  <Button variant='contained' size='large' fullWidth 
                     onClick={ () => sendChallenge(color, props.query._doc, opponentEmail, resetOpponentEmail) } 
                  > 
                     Send Challenge 
                  </Button>
               </Stack>
            </Paper>
            <Button 
               variant="contained" color="success"
               disabled={ !gameInfo.canStartGame }
               sx={{ height: '100px', fontSize: '25px'  }}
               onClick={handleClick}
            >
               Start Game
            </Button>
         </Stack>
      </Stack>
   )
}

ChessIndex.getInitialProps = async ({ query }) => {
   return {
      query
   };
}
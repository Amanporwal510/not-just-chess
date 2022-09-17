import Router from 'next/router';
import axios from 'axios';
import {
   styled,
   TableRow,
   Button
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';

import { socket } from '../connection/socket';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
   },
   // hide last border
   '&:last-child td, &:last-child th': {
      border: 0,
   },
}));


export const returnTableRows = (setGameInfo, challenges) => {
   return challenges.map( (challenge) => {
      return <StyledTableRow key={challenge._id} >
         <StyledTableCell align="left" ><AccountBoxSharpIcon/></StyledTableCell>
         <StyledTableCell>{challenge.opponentName}</StyledTableCell>
         <StyledTableCell align='right' >
            <Button onClick={ () => ( joinGame(setGameInfo, challenge))} >
               Accept
            </Button>
         </StyledTableCell>
         <StyledTableCell align='right' >
            <Button onClick={ async () => (await axios.patch(`http://localhost:3000/api/challenge/${challenge._id}`))} >
               Decline
            </Button>
         </StyledTableCell>
      </StyledTableRow>
})
}

export const joinGame = (setGameInfo, challenge) => {
   // console.log(challenge);
   socket.emit("join-game", {gameId: challenge.gameId, isWhite: !challenge.isWhite });
   
   // setGameInfo({ ...gameInfo, isWhite: challenge.isWhite, gameId: challenge.gameId })
   setGameInfo( (prevState) => {
      return {
         ...prevState,
         isWhite: challenge.isWhite,
         gameId: challenge.gameId
      }
   });
   axios.patch(`http://localhost:3000/api/challenge/${challenge._id}`);
   Router.push( `/game/${challenge.gameId}`);
}
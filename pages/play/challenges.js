import * as React from 'react';
import {
   Table,
   TableBody,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   Container,
} from '@mui/material';
import axios from 'axios';

import {
   returnTableRows,
   StyledTableCell,
} from '../../methods/methodsOnChallenges'

export default function ChallengesTable(props) {
   // console.log(props)

   const { gameInfo, setGameInfo } = React.useContext(props.DataContext);

   return (
      <Container sx={{ maxWidth: '100vw', display: 'flex', justifyContent: 'center' }} >
         <TableContainer sx={{ maxWidth: '90%'}} component={Paper}>
            <Table>
               <TableHead>
                  <TableRow>
                     <StyledTableCell align="center" colSpan={4} >Challenges</StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  { returnTableRows(setGameInfo, props.challenges) } 
               </TableBody>
            </Table>
         </TableContainer>
      </Container>
   );
}

ChallengesTable.getInitialProps = async (context) => {

   const res = await axios({
      url: "http://localhost:3000/api/challenge",
      // manually copy cookie on server,
      // let browser handle it automatically on client
      headers: context.req ? {cookie: context.req.headers.cookie} : undefined,
    });

   //  console.log(res.data)

   return {
      challenges : res.data
   };
}
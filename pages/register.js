import Router from 'next/router'
import React from 'react';
import { 
   Avatar,
   Button,
   CssBaseline,
   TextField,
   Link,
   Grid,
   Box,
   Typography,
   Container
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios'

import useInputState from '../hooks/newInputState'

export default function signUp() {

   const [ firstName, handlefirstNameChange, resetFirstName ] = useInputState("");
   const [ lastName, handleLastNameChange, resetLastName ] = useInputState("");
   const [ email, handleEmailChange, resetEmail ] = useInputState("");
   const [ password, handlePasswordChange, resetPassword ] = useInputState("");

   const handleSubmit = async (event) => {
      event.preventDefault();
      const res = await axios.post('/register', {
         firstname: firstName,
         lastname: lastName,
         email: email,
         password: password
      })

      // await axios.post('/login', { email: email, password: password })  
      resetFirstName()
      resetLastName()
      resetEmail()
      resetPassword()
      Router.push('/login')
   };
  
   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
         >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Sign Up
            </Typography>
            <form onSubmit={handleSubmit} >
               <Box sx={{ mt: 1 }}>
                  <Grid container spacing={2}>
                     <Grid item xs={12} sm={6}>
                        <TextField
                           color='secondary'   
                           autoComplete="given-name"
                           name="firstName"
                           required
                           fullWidth
                           label="First Name"
                           autoFocus
                           value={firstName} 
                           onChange={handlefirstNameChange}
                        />
                     </Grid>
                     <Grid item xs={12} sm={6}>
                        <TextField
                           color='secondary'
                           required
                           fullWidth
                           label="Last Name"
                           name="lastName"
                           autoComplete="family-name"
                           value={lastName} 
                           onChange={handleLastNameChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           color='secondary'
                           required
                           fullWidth
                           id="email"
                           label="Email Address"
                           name="email"
                           autoComplete="email"
                           value={email} 
                           onChange={handleEmailChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           color='secondary'
                           required
                           fullWidth
                           name="password"
                           label="Password"
                           type="password"
                           value={password} 
                           onChange={handlePasswordChange}
                        />
                     </Grid>
                  </Grid>
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     color='secondary'
                     sx={{ mt: 3, mb: 2 }}
                  >
                     Sign Up
                  </Button>
                  <Grid container>
                     <Grid item xs>
                        <Link href="#" variant="body2">
                           Forgot password?
                        </Link>
                     </Grid>
                     <Grid item>
                        <Link href="/register" variant="body2">
                           Don't have an account? Sign Up
                        </Link>
                     </Grid>
                  </Grid>
               </Box>
            </form>
         </Box>
      </Container>
   );
}
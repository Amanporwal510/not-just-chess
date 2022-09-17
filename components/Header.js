import * as React from 'react'
import { AppBar,
   Box,
   Toolbar, 
   Typography, 
   IconButton
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Not Just Chess
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export const NavBar = () => {
  const title = "Pathfinder Youth Centre Society Database Application"
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export const NavBar = () => {
  const title = 'Pathfinder Youth Centre Society Participant Database';
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="title" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

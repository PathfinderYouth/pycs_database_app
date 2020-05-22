import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';
import './style/TopNavBar.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

/**
 * Top navbar component
 * @param {boolean} drawerState drawer open/close state
 * @param {function} handleDrawerOpen drawer open/close handler function
 * @param {function} onLogoutClicked OnClick handler function for logout button
 */
export const TopNavBar = ({ drawerState, handleDrawerOpen, onLogoutClicked }) => {
  const classes = useStyles();
  const title = 'Pathfinder Youth Centre Society Participant Database';

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: drawerState,
      })}
    >
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" className="title" noWrap>
          {title}
        </Typography>

        <Tooltip title="Sign out" aria-label="create" placement="bottom">
          <IconButton color="inherit" aria-label="log out" onClick={onLogoutClicked}>
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

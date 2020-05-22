import React, { useContext, useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { AuthContext } from '../../../sign-in';
import '../style/NavDrawer.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  container: {
    padding: theme.spacing(2),
  },
  drawerHeader: {
    padding: theme.spacing(1, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,

    [theme.breakpoints.down('sm')]: {
      // Add attributes for phone size.
      marginTop: '0em',
      justifyContent: 'space-between',
    },
  },
}));

/**
 * Generic navigation drawer component
 * @param {Object} window global window object
 * @param {Component} children child components
 * @param {boolean} drawerState open/close state of the drawer
 * @param {function} handleDrawerClose drawer open handler for when the drawer hides on narrow views
 */
export const NavDrawer = ({ window, children, drawerState, handleDrawerClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const container = window !== undefined ? () => window().document.body : undefined;

  const [userName, setUserName] = useState('');
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    if (currentUser) {
      setUserName(!!currentUser.displayName ? currentUser.displayName : currentUser.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawer = (
    <div>
      <div className={`${classes.drawerHeader} drawerHeader`}>
        <Typography variant="h6">{userName}</Typography>

        {matches ? (
          <IconButton
            aria-label="more options"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleDrawerClose}
            color="inherit"
          >
            <ArrowBackIcon />
          </IconButton>
        ) : null}
      </div>
      <Divider />
      {children}
    </div>
  );

  return (
    <div className="root">
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor="left"
            open={drawerState}
            onClose={handleDrawerClose}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open={drawerState}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

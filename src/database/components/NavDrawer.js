import React from 'react';
import { RecordSearchBar } from './RecordSearchBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  container: {
    padding: theme.spacing(2),
  },
  drawerHeader: {
    marginTop: '64px', //TODO find a better way than using px.
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(1, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,

    [theme.breakpoints.down('sm')]: {
      // Add attributes for phone size.
      marginTop: '0px', //TODO find a better way than using px.
      justifyContent: 'space-between',
    },
  },
}));

export const NavDrawer = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div>
      <div className={classes.drawerHeader}>
        <Typography>UserLogin@pycs.org</Typography>

        {matches ? (
          <IconButton
            aria-label="more options"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={props.handleDrawerClose}
            color="inherit"
          >
            <ArrowBackIcon />
          </IconButton>
        ) : null}
      </div>
      <Divider />
      <div className={classes.container}>
        <RecordSearchBar />
      </div>
      <Divider />
      <List>
        {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map(
          (text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ),
        )}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor="left"
            open={props.handleDrawerState}
            onClose={props.handleDrawerClose}
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
            open={props.handleDrawerState}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

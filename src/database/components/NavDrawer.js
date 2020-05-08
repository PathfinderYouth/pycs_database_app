import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { RecordViewDrawer } from './RecordViewDrawer';
import { ListViewDrawer } from './ListViewDrawer';
import './style/NavDrawer.css';

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
      marginTop: '0em', //TODO find a better way than using px.
      justifyContent: 'space-between',
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const NavDrawer = (props) => {
  const { window, isRecordOpen } = props;
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleListViewClick = () => {
    //TODO
  };

  const handleRecordViewClick = () => {
    //TODO
  };

  const drawer = (
    <div>
      <div className={`${classes.drawerHeader} drawerHeaderCss`}>
        <Typography>Staff McStaff</Typography>

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
      {isRecordOpen ? (
        <RecordViewDrawer handleClick={handleRecordViewClick} />
      ) : (
        <ListViewDrawer
          numNew={4}
          handleClick={handleListViewClick}
          classes={classes}
        />
      )}
      ;
    </div>
  );

  return (
    <div className="root">
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

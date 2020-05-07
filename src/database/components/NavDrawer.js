import React, { useState } from 'react';
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
import Badge from '@material-ui/core/Badge';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import './style/NavDrawer.css';
import { Collapse } from '@material-ui/core';

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
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [
    participantsListExpanded,
    setParticipantsListExpanded,
  ] = useState(true);
  const numNew = props.numNew;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const expandClick = () => {
    setParticipantsListExpanded(!participantsListExpanded);
  };

  const handleClick = () => {
    //TODO
  };

  const drawer = (
    <div>
      <div className={`${classes.drawerHeader} drawerHeaderCss`}>
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
      <List>
        <ListItem button key="New Applications" onClick={handleClick}>
          <Badge badgeContent={numNew} color="secondary">
            <ListItemText
              primary="New Applications"
              className="listItemWithBadge"
            />
          </Badge>
        </ListItem>
        <Divider />
        <div className={classes.container}>
          <RecordSearchBar />
        </div>
        <Divider />
        <ListItem button key="participants" onClick={handleClick}>
          <ListItemText primary="All Participants" />
          <div className="expandButton" onClick={expandClick}>
            {participantsListExpanded ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </div>
        </ListItem>
        <Collapse in={participantsListExpanded} timeout="auto">
          <List component="div" disablePadding>
            {['Pending', 'Approved', 'Denied'].map((text) => (
              <ListItem
                button
                key={text}
                className={classes.nested}
                onClick={handleClick}
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
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

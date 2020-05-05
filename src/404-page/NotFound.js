import React from 'react';
import Logo from '../assets/Pathfinder-Logo.jpg';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from '@reach/router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#F5F5F5',
    height: '100vh'
  },

  content: {
    flexBasis: 'content',
    padding: theme.spacing(3),
    margin: '100px auto auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },

  hyperlink: {
    color: theme.color
  },

  logo: {
    margin: '15px',
    maxHeight: '10em'
  },

  errorText: {
    margin: '15px'
  }

}));

export const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.content}>
        <img className={classes.logo} src={Logo} alt="Pathfinder Youth Centre Society logo" />
        <div className={classes.errorText}>
          <Typography variant='h3'>Page not found</Typography>
          <br/>
          <Typography variant='body1'><b>Potential participants</b>, <Link to='/'>click here</Link> to access the intake form.</Typography>
          <Typography variant='body1'><b>Pathfinder Youth Society Centre staff</b>, <Link to='/sign-in'>click here</Link> to login.</Typography>
          <br />
          <Typography variant='body1'><a href='https://pathfinderyouthsociety.org/'>Click here</a> to return to the Pathfinder Youth Society homepage.</Typography>
        </div>
      </Card>
    </div>
  );
};
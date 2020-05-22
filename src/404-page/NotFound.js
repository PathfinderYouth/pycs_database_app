import React from 'react';
import Logo from '../assets/Pathfinder-Logo.jpg';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { Link } from '@reach/router';
import './style/NotFound.css';

/**
 * 404-not found component that appears when the user enters an invalid value in the url
 */
export const NotFound = () => {
  return (
    <div className="root">
      <Card className="content">
        <img className="logo" src={Logo} alt="Pathfinder Youth Centre Society logo" />
        <div className="errorText">
          <Typography variant="h3">Page not found</Typography>
          <br />
          <Typography>
            <b>Potential participants</b>, <Link to="/">click here</Link> to access the intake form.
          </Typography>
          <Typography>
            <b>Pathfinder Youth Society Centre staff</b>, <Link to="/sign-in">click here</Link> to
            login.
          </Typography>
          <br />
          <Typography>
            <a href="https://pathfinderyouthsociety.org/">Click here</a> to return to the Pathfinder
            Youth Society homepage.
          </Typography>
        </div>
      </Card>
    </div>
  );
};

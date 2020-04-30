import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from '@reach/router';
import { NavDrawer } from './components';
import { makeStyles } from '@material-ui/core/styles';
import { RecordListContainer } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

// for testing table view
const records = [
  {lastName: "McTest",
  firstName: "Test",
  address: "123 1st St",
  city: "Surrey",
  id: 1},
  {lastName: "McBob",
  firstName: "Bob",
  address: "125 2nd St",
  city: "Surrey",
  id: 2}
]

// container that holds all database UI objects
export const Database = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavDrawer />
      <div className={classes.content}>
        {/* TODO: Appbar goes here */}
        <Typography variant="h3">Database UI</Typography>
        {/* Components go here */}
        <div>
          <Link to="/">
            <Typography>Back to the intake form</Typography>
          </Link>
          <RecordListContainer records={records}></RecordListContainer>
        </div>
      </div>
    </div>
  )
};

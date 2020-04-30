import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './IntakeForm.css';
import Logo from '../../assets/Pathfinder-Logo.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export const IntakeForm = (props) => {
  const classes = useStyles();
  const {
    values,
    // errors,
    // touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = props.form;
  return (
    <div className={`${classes.root} container`}>
      <div>
        <Link href="#">
          <Typography>
            &lt; Back to pathfinderyouthsociety.org
          </Typography>
        </Link>
      </div>
      <div className="formContainer">
        <div className="form">
          <img
            src={Logo}
            alt="Pathfinder Youth Centre Society logo"
          />
          <Typography gutterBottom variant="h4">
            Self-Enrollment System
          </Typography>
          <Typography gutterBottom>
            To begin, please enter your name:
          </Typography>
          <Typography gutterBottom variant="body2">
            * indicates a required field
          </Typography>
          <div className="row">
            <TextField
              name="nameGiven"
              label="Given name(s)"
              value={values.nameGiven}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              required
            />
            <TextField
              name="nameLast"
              label="Last name"
              value={values.nameLast}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              required
            />
          </div>
        </div>
      </div>
      <div className="bottomBar">
        <div className="buttonRight">
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

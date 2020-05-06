import React from 'react';
import Logo from '../../assets/Pathfinder-Logo.jpg';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import './FormSteps.css';

export const FormStepStart = (props) => {
  const { values, errors, touched, handleChange, handleBlur } = props.form;
<<<<<<< HEAD
<<<<<<< HEAD
=======
  // console.log(errors)
  // console.log(touched)
>>>>>>> 6bfc3a5... Setting up initial validation schema
=======
>>>>>>> f522405... Adding more validation tests
  
  return (
    <div className="startPageContainer">
      <div className="startPageContents">
        <img className="logo" src={Logo} alt="Pathfinder Youth Centre Society logo" />
        <Typography gutterBottom variant="h4">
          Self-Enrollment System
        </Typography>
        <Typography gutterBottom color="textSecondary">
          To begin, please enter your name:
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          color="textSecondary"
        >
          * indicates a required field
        </Typography>
        <div>
          <TextField
            name="nameGiven"
            label="Given name(s)"
            value={values.nameGiven}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            error={!!errors['nameGiven'] && touched['nameGiven']}
            helperText={(!!errors['nameGiven'] && touched['nameGiven']) && errors['nameGiven']}
            required
          />
          <TextField
            name="nameLast"
            label="Last name"
            value={values.nameLast}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            error={!!errors['nameLast'] && touched['nameLast']}
            helperText={(!!errors['nameLast'] && touched['nameLast']) && errors['nameLast']}
            required
          />
        </div>
        <div className="formTextContainer">
          <Typography
            gutterBottom
            align="center"
            variant="body2"
            color="textSecondary"
          >
            Pathfinder Youth Centre Society is committed to protecting
            personal information by following responsible information
            handling practices, in keeping with privacy laws.
          </Typography>
          <Typography
            align="center"
            variant="body2"
            color="textSecondary"
          >
            We collect, use and disclose personal data in order to
            better meet your need in our program, to ensure the safety
            of our participants, for statistical purposes, to inform
            you about the PYCS program or service in which you are
            registered and to satisfy government and regulatory
            obligations.
          </Typography>
        </div>
      </div>
    </div>
  );
};

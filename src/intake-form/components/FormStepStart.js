import React from 'react';
import Logo from '../../assets/Pathfinder-Logo.jpg';
import Typography from '@material-ui/core/Typography';
import './style/IntakeForm.css';

/**
 * Starting step of the intake form
 */
export const FormStepStart = () => {
  return (
    <div className="intake-form-pageContainer">
      <div className="intake-form-pageContents">
        <img className="logo" src={Logo} alt="Pathfinder Youth Centre Society logo" />
        <Typography gutterBottom align="center" variant="h4">
          Self-Enrollment System
        </Typography>
        <div className="intake-form-textContainer">
          <Typography gutterBottom align="center" variant="body2" color="textSecondary">
            Pathfinder Youth Centre Society is committed to protecting personal information by
            following responsible information handling practices, in keeping with privacy laws.
          </Typography>
          <Typography align="center" variant="body2" color="textSecondary">
            We collect, use and disclose personal data in order to better meet your need in our
            program, to ensure the safety of our participants, for statistical purposes, to inform
            you about the PYCS program or service in which you are registered and to satisfy
            government and regulatory obligations.
          </Typography>
        </div>
        <Typography variant="h6" align="center" color="textSecondary">
          To begin, please click the Next button.
        </Typography>
      </div>
    </div>
  );
};

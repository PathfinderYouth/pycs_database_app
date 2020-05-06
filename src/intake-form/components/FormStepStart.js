import React from 'react';
import Logo from '../../assets/Pathfinder-Logo.jpg';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { FormFieldBuilder } from './FormFieldBuilder';
import './FormSteps.css';

export const FormStepStart = ({ form, step }) => {
  const { fields } = step
  return (
    <div className="startPageContainer">
      <div className="startPageContents">
        <img className="logo" src={Logo} alt="Pathfinder Youth Centre Society logo" />
        <Typography gutterBottom align="center" variant="h4">
          Self-Enrollment System
        </Typography>
        <Typography gutterBottom align="center" color="textSecondary">
          To begin, please enter your name:
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          color="textSecondary"
        >
          * indicates a required field
        </Typography>
        <Grid container spacing={2}>
          {fields.map((field) => <FormFieldBuilder key={field.name} form={form} field={field} />)}
        </Grid>
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

import React from 'react';
import Logo from '../../assets/Pathfinder-Logo.jpg';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import './FormSteps.css';

export const FormStepConfirmation = () => {
  return (
    <div className="startPageContainer">
      <div className="startPageContents">
        <img
          className="logo"
          src={Logo}
          alt="Pathfinder Youth Centre Society logo"
        />
        <Typography gutterBottom variant="h4">
          Self-Enrollment System
        </Typography>
        <Typography variant="h5">
          Your application has been successfully receieved.
        </Typography>
        <Typography>
          You will be contacted soon for an interview.
        </Typography>
        <div className="formTextContainer">
          <Typography
            variant="body2"
            align="center"
            color="textSecondary"
          >
            In order to complete your application, Pathfinder requires
            participants to fill out an additional form from the
            government of Canada. Please download, fill out, and sign
            this form, then either email it to{' '}
            <Link
              href="mailto:pathfinderyouthsociety@shaw.ca"
              target="_blank"
              rel="noreferrer"
            >
              pathfinderyouthsociety@shaw.ca
            </Link>{' '}
            or bring a physical copy with you when you when you come
            in for your interview.
          </Typography>
        </div>
        <Typography gutterBottom variant="h4">
          <Link
            href="https://catalogue.servicecanada.gc.ca/content/EForms/en/CallForm.html?Lang=en&PDF=ESDC-EMP5317.pdf"
            target="_blank"
            rel="noreferrer"
          >
            DOWNLOAD FORM
          </Link>
        </Typography>
        <Typography color="textSecondary">
          <Link href="https://pathfinderyouthsociety.org/">
            Return to pathfinderyouthsociety.org
          </Link>
        </Typography>
      </div>
    </div>
  );
};

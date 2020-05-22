import React from 'react';
import Logo from '../../assets/Pathfinder-Logo.jpg';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import './style/IntakeForm.css';

/**
 * Final step of the intake form, shown after the form data is successfully posted to the Firestore database
 */
export const FormStepConfirmation = () => {
  return (
    <div className="intake-form-pageContainer">
      <div className="intake-form-pageContents">
        <img className="intake-form-logo" src={Logo} alt="Pathfinder Youth Centre Society logo" />
        <Typography gutterBottom variant="h4">
          Self-Enrollment System
        </Typography>
        <Typography variant="h5">Your application has been successfully received.</Typography>
        <Typography>You will be contacted soon for an interview.</Typography>
        <div className="intake-form-textContainer">
          <Typography variant="h5">Next steps</Typography>
          <Typography>
            In order to complete your application, Pathfinder requires participants to fill out an
            additional form from the Government of Canada. Please download the form using the link
            below, and then either:
          </Typography>
          <ul>
            <li>
              <Typography>
                Fill it out, including your signature, and email it to{' '}
                <Link href="mailto:pathfinderyouthsociety@shaw.ca" target="_blank" rel="noreferrer">
                  pathfinderyouthsociety@shaw.ca
                </Link>
                , or
              </Typography>
            </li>
            <li>
              <Typography>
                Print it, fill it out, including your signature, and bring it with you when you when
                you come in for your interview
              </Typography>
            </li>
          </ul>
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

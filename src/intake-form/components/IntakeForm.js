import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { FormStepStart } from './FormStepStart';
import { FormStepBasics } from './FormStepBasics';
import { FormStepMedical } from './FormStepMedical';
import { FormStepCurrentStatus } from './FormStepCurrentStatus';
import { FormStepQuestions } from './FormStepQuestions';
import { FormStepConfirmation } from './FormStepConfirmation';
import './IntakeForm.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      minWidth: '25ch',
    },
  },
}));

export const IntakeForm = (props) => {
  const classes = useStyles();
  const { form } = props;
  const { handleSubmit, isSubmitting } = form;
  const [currentStep, setCurrentStep] = useState(1);

  const handleClickBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClickNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  /* 
  1 - Start page
  2 - Basic info
  3 - Medical info
  4 - Current status
  5 - Questions
  6 - Confirmation page
  */
  const getFormStep = (form, step) => {
    switch (step) {
      case 2:
        return <FormStepBasics form={form} />;
      case 3:
        return <FormStepMedical form={form} />;
      case 4:
        return <FormStepCurrentStatus form={form} />;
      case 5:
        return <FormStepQuestions form={form} />;
      case 6:
        return <FormStepConfirmation />;
      default:
        return <FormStepStart form={form} />;
    }
  };

  return (
    <div className={`${classes.root} container`}>
      <div className="topLeftLink">
        <Link href="https://pathfinderyouthsociety.org/">
          <Typography>
            &lt; Back to pathfinderyouthsociety.org
          </Typography>
        </Link>
      </div>
      <div className="formContainer">
        <div className="form">{getFormStep(form, currentStep)}</div>
      </div>
      {currentStep !== 6 && (
        <div className="bottomBar">
          <div className="buttonBack">
            {currentStep !== 1 && (
              <Button
                color="primary"
                variant="contained"
                onClick={handleClickBack}
              >
                Back
              </Button>
            )}
          </div>
          <div className="buttonNext">
            {currentStep < 5 && (
              <Button
                color="primary"
                variant="contained"
                onClick={handleClickNext}
              >
                Next
              </Button>
            )}
            {currentStep === 5 && (
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  handleSubmit(form.values, form);
                  // TODO: only proceed to next step if pushing to database was successful,
                  // otherwise, show an error message somehow
                  handleClickNext();
                }}
                disabled={isSubmitting}
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

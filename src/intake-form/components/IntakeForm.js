import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { FormStepStart } from './FormStepStart';
import { FormStepBasics } from './FormStepBasics';
import { FormStepMedical } from './FormStepMedical';
import { FormStepCurrentStatus } from './FormStepCurrentStatus';
import { FormStepQuestions } from './FormStepQuestions';
import { requiredFields } from '../fields';
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
  const [currentStep, setCurrentStep] = useState(0);

  // Validates form on initial load, generating errors that must be cleared in order to proceed
  useEffect(() => {
    props.form.validateForm();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Steps backward a step in the form
   */
  const handleClickBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  /**
   * Checks if the current form step has any errors and prevents progression if so. If not, proceeds to the next step.
   * @param form Formik form object
   */
  const handleClickNext = (form) => {
    const { errors, setFieldTouched } = form;
    let stepHasErrors = false;
    requiredFields[currentStep].forEach((field) => {
      setFieldTouched(field);
      if (!!errors[field]) {
        stepHasErrors = true;
      }
    });
    if (!stepHasErrors) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  /**
   * Determines what step to render based on currentStep
   * 0 - Start page
   * 1 - Basic info
   * 2 - Medical info
   * 3 - Current status
   * 4 - Questions
   * 5 - Confirmation page
  @param form Formik form object
  @param step int
  */
  const getFormStep = (form, step) => {
    switch (step) {
      case 1:
        return <FormStepBasics form={form} />;
      case 2:
        return <FormStepMedical form={form} />;
      case 3:
        return <FormStepCurrentStatus form={form} />;
      case 4:
        return <FormStepQuestions form={form} />;
      case 5:
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
      <div className="bottomBar">
        <div className="buttonBack">
          {currentStep !== 0 && (
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
          {currentStep < 4 && (
            <Button
              color="primary"
              variant="contained"
              onClick={() => handleClickNext(form)}
            >
              Next
            </Button>
          )}
            {currentStep === 4 && (
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  handleSubmit(form.values, form);
                  // TODO: only proceed to next step if pushing to database was successful,
                  // otherwise, show an error message somehow
                  handleClickNext(form);
                }}
                disabled={isSubmitting}
              >
                Submit
              </Button>
            )}
          </div>
        </div>
    </div>
  );
};

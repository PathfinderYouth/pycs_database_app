import React, { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { FormStepStart } from './FormStepStart';
import { formSteps, requiredFields } from './fields';
import { FormStepConfirmation } from './FormStepConfirmation';
import { FormStep } from './FormStep';
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
  const recaptchaRef = React.createRef();
  const lastStepNumber = formSteps.length;

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
   * Called when a user is verified via ReCaptcha
   */
  const onCaptchaChanged = () => {
    toNextPage();
  };

  /**
   * Goes to next step in form
   */
  const toNextPage = () => {
    setCurrentStep(currentStep + 1);
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
      if (currentStep < lastStepNumber) {
        if (currentStep === lastStepNumber - 1) {
          recaptchaRef.current.execute()
        } else {
          toNextPage();
        }
      }
    }
  };

  const getFormStep = (form, step) => {
    const currentStep = formSteps[step];
    if (step > 0 && step < lastStepNumber) {
      return <FormStep form={form} step={currentStep}/>;
    } else if (step >= lastStepNumber) {
      return <FormStepConfirmation />
    } else {
      return <FormStepStart form={form} step={currentStep}/>
    }
  };

  return (
    <div className={`${classes.root} container`}>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6LfukvMUAAAAAGkE5uDvYCqdi-DEKey3J8AiZl8v"
        size="invisible"
        onChange={onCaptchaChanged}
      />
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
        <div className="captcha">
          <Typography
            variant="body2"
            color="textSecondary"
            className="captcha"
          >
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="https://policies.google.com/privacy">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="https://policies.google.com/terms">
              Terms of Service
            </a>{' '}
            apply.
          </Typography>
        </div>
        <div className="buttonNext">
          {currentStep < lastStepNumber - 1 && (
            <Button
              color="primary"
              variant="contained"
              onClick={() => handleClickNext(form)}
            >
              Next
            </Button>
          )}
            {currentStep === lastStepNumber - 1 && (
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

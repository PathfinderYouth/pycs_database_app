import React, { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSnackbar } from 'notistack';
import { useTheme } from '@material-ui/core/styles';
import { FormStepStart } from './FormStepStart';
import { formSteps, requiredFields } from './fields';
import { FormStepConfirmation } from './FormStepConfirmation';
import { FormStep } from './FormStep';
import './style/IntakeForm.css';

export const IntakeForm = (props) => {
  const { form } = props;
  const { values, handleSubmit, isSubmitting } = form;
  const [currentStep, setCurrentStep] = useState(-1);
  const recaptchaRef = React.createRef();
  const { enqueueSnackbar } = useSnackbar();
  const lastStepNumber = formSteps.length;
  const theme = useTheme();
  const isFullSize = useMediaQuery(theme.breakpoints.up('md'));
  let visitedSteps = [];
  let formContainerDiv; // reference to form container div

  /**
   * Validates form on initial load, generating errors that must be cleared in order to proceed
   */

  useEffect(() => {
    props.form.validateForm();
    visitStep(currentStep);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Scrolls to the top of the form container when the page changes
   */
  useEffect(() => {
    formContainerDiv.scrollTop = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

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
   * Checks current step for errors
   */
  const stepHasErrors = () => {
    const { errors, setFieldTouched } = form;
    let hasErrors = false;
    if (currentStep > -1) {
      requiredFields[currentStep].forEach((field) => {
        setFieldTouched(field);
        if (!!errors[field]) {
          hasErrors = true;
        }
      });
      hasErrors &&
        enqueueSnackbar('Some fields have errors. Please resolve them to continue.', {
          variant: 'error',
        });
    }

    return hasErrors;
  };

  /**
   * Adds current step to list of visited steps
   * @param stepNumber int
   */
  const visitStep = (stepNumber) => {
    if (!visitedSteps.includes(stepNumber)) {
      visitedSteps.push(stepNumber);
    }
  };

  /**
   * Checks if the current form step has any errors and prevents progression if so. If not, proceeds to the next step.
   * @param form Formik form object
   */
  const handleClickNext = () => {
    if (!stepHasErrors()) {
      if (currentStep < lastStepNumber) {
        if (currentStep === lastStepNumber - 1) {
          recaptchaRef.current.execute();
        } else {
          toNextPage();
        }
      }
    }
  };

  /**
   * Steps backward a step in the form
   */
  const handleClickBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  /**
   * Navigates directly to a form step if:
   * - the step is before the current step
   * - the current step has no errors and the clicked step is only 1 step ahead
   * - the current step has no errors and the clicked step has been visited before
   * @param event click event
   * @param stepNumber int
   */
  const handleClickStep = (event, stepNumber) => {
    event.preventDefault();
    if (stepNumber < currentStep) {
      setCurrentStep(stepNumber);
    } else if (stepNumber === currentStep + 1) {
      handleClickNext();
    } else if (!visitedSteps.includes(stepNumber)) {
      enqueueSnackbar('Must complete steps before proceeding.', {
        variant: 'error',
      });
    } else if (visitedSteps.includes(stepNumber)) {
      setCurrentStep(stepNumber);
    }
  };

  /**
   * Gets the component for the current step index
   * @param form Formik form
   * @param step int
   */
  const getFormStep = (form, step) => {
    const currentStep = formSteps[step];
    if (step > -1 && step < lastStepNumber) {
      return <FormStep form={form} step={currentStep} />;
    } else if (step >= lastStepNumber) {
      return <FormStepConfirmation />;
    } else {
      return <FormStepStart />;
    }
  };

  return (
    <div className="container">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6LfukvMUAAAAAGkE5uDvYCqdi-DEKey3J8AiZl8v"
        size="invisible"
        onChange={onCaptchaChanged}
      />
      <div className="form-topBar">
        <Typography display="inline">
          <Link href="https://pathfinderyouthsociety.org/">
            &lt; Back to pathfinderyouthsociety.org
          </Link>
        </Typography>
      </div>

      {currentStep > -1 && currentStep < lastStepNumber && (
        <div className="form-breadcrumbs">
          <Breadcrumbs
            maxItems={isFullSize ? undefined : 2}
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {formSteps.map(
              (step, index) =>
                index > -1 &&
                (currentStep === index ? (
                  <Typography key={step.stepName} variant="caption" color="textSecondary">
                    {step.stepName}
                  </Typography>
                ) : (
                  <Link
                    key={step.stepName}
                    variant="caption"
                    href="#"
                    onClick={(event) => handleClickStep(event, index)}
                  >
                    {step.stepName}
                  </Link>
                )),
            )}
            <Typography variant="caption" color="textPrimary">
              Confirmation
            </Typography>
          </Breadcrumbs>
        </div>
      )}

      <div className="form-container" ref={(ref) => (formContainerDiv = ref)}>
        <div className="form">{getFormStep(form, currentStep)}</div>
      </div>
      <div className="form-bottomBar">
        <div className="form-buttonBack">
          {currentStep > 0 && currentStep < lastStepNumber && (
            <Button color="primary" variant="contained" onClick={handleClickBack}>
              Back
            </Button>
          )}
        </div>
        <div className="captcha">
          <Typography variant="body2" color="textSecondary" className="captcha">
            This site is protected by reCAPTCHA and the Google{' '}
            <Link href="https://policies.google.com/privacy">Privacy Policy</Link> and{' '}
            <Link href="https://policies.google.com/terms">Terms of Service</Link> apply.
          </Typography>
        </div>
        <div className="buttonNext">
          {currentStep < lastStepNumber - 1 && (
            <Button color="primary" variant="contained" onClick={handleClickNext}>
              Next
            </Button>
          )}
          {currentStep === lastStepNumber - 1 && (
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                handleSubmit(values, form);
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

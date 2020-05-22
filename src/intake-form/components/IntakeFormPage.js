import React, { createRef, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
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
import { FormStepConfirmation } from './FormStepConfirmation';
import { FormStep } from './FormStep';
import { uiStore } from '../../injectables';
import { formSteps } from '../../fields';
import './style/IntakeForm.css';

/**
 * Container component for the Intake Form. Displays different form pages depending on the current intake
 * form step set in the UIStore
 * @param {Object} form Formik object
 */
export const IntakeFormPage = inject('uiStore')(
  observer(({ form }) => {
    const { values, handleSubmit, isSubmitting } = form;
    const { currentIntakeFormStep, setCurrentIntakeFormStep } = uiStore;
    const [visitedSteps, setVisitedSteps] = useState([]);
    const recaptchaRef = createRef();
    const { enqueueSnackbar } = useSnackbar();
    const lastStepNumber = formSteps.length;
    const theme = useTheme();
    const isFullSize = useMediaQuery(theme.breakpoints.up('md'));
    let formContainerDiv; // reference to form container div
    let vh; // reference to the viewport height

    /**
     * Get viewport height on mobile and set --vh variable for css use.
     */
    const setViewportHeight = () => {
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();

    // listen to the resize event
    window.addEventListener('resize', () => {
      setViewportHeight();
    });

    /**
     * Validates form on initial load, generating errors that must be cleared in order to proceed
     */
    useEffect(() => {
      form.validateForm();
      visitStep(currentIntakeFormStep);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Scrolls to the top of the form container when the page changes
     */
    useEffect(() => {
      formContainerDiv.scrollTop = 0;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIntakeFormStep]);

    /**
     * Verifies captcha has been successfully passed, then submits the form
     * @param {Object} response
     */
    const onCaptchaChanged = (response) => {
      if (response !== null) {
        handleSubmit(values, form);
      }
    };

    /**
     * Checks current step for errors
     */
    const stepHasErrors = () => {
      const { errors, setFieldTouched } = form;
      let hasErrors = false;
      if (currentIntakeFormStep > -1) {
        formSteps[currentIntakeFormStep].fields.forEach((field) => {
          const { name: fieldName } = field;
          setFieldTouched(fieldName);
          if (!!errors[fieldName]) {
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
     * @param {int} stepNumber
     */
    const visitStep = (stepNumber) => {
      if (!visitedSteps.includes(stepNumber)) {
        setVisitedSteps([...visitedSteps, stepNumber]);
      }
    };

    /**
     * Checks if the current form step has any errors and prevents progression if so. If not, proceeds to the next step.
     */
    const handleClickNext = () => {
      if (!stepHasErrors()) {
        if (currentIntakeFormStep < lastStepNumber) {
          setCurrentIntakeFormStep(currentIntakeFormStep + 1);
          visitStep(currentIntakeFormStep + 1);
        }
      }
    };

    /**
     * Steps backward a step in the form
     */
    const handleClickBack = () => {
      if (currentIntakeFormStep > 0) {
        setCurrentIntakeFormStep(currentIntakeFormStep - 1);
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
      if (stepNumber < currentIntakeFormStep) {
        setCurrentIntakeFormStep(stepNumber);
      } else if (stepNumber === currentIntakeFormStep + 1) {
        handleClickNext();
      } else if (!visitedSteps.includes(stepNumber)) {
        enqueueSnackbar('Must complete steps before proceeding.', {
          variant: 'error',
        });
      } else if (visitedSteps.includes(stepNumber)) {
        setCurrentIntakeFormStep(stepNumber);
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
      <div className="intake-form-page-container">
        {/* Hidden recaptcha component */}
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LfukvMUAAAAAGkE5uDvYCqdi-DEKey3J8AiZl8v"
          size="invisible"
          onChange={(response) => onCaptchaChanged(response)}
        />

        {/* Top bar containing link back to pathfinder's website */}
        <div className="intake-form-topBar">
          <Typography display="inline">
            <Link href="https://pathfinderyouthsociety.org/">
              &lt; Back to pathfinderyouthsociety.org
            </Link>
          </Typography>
        </div>

        {/* Breadcrumbs */}
        {currentIntakeFormStep > -1 && currentIntakeFormStep < lastStepNumber && (
          <div className="intake-form-breadcrumbs">
            <Breadcrumbs
              maxItems={isFullSize ? undefined : 2}
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {formSteps.map(
                (step, index) =>
                  index > -1 &&
                  (currentIntakeFormStep === index ? (
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

        {/* Current form step page */}
        <div className="intake-form-container" ref={(ref) => (formContainerDiv = ref)}>
          <div className="intake-form-step">{getFormStep(form, currentIntakeFormStep)}</div>
        </div>

        {/* Bottom navigation bar */}
        <div className="intake-form-bottomBar">
          <div className="form-buttonBack">
            {currentIntakeFormStep > 0 && currentIntakeFormStep < lastStepNumber && (
              <Button color="primary" variant="contained" onClick={handleClickBack}>
                Back
              </Button>
            )}
          </div>
          <div className="intake-form-captcha">
            <Typography variant="body2" color="textSecondary">
              This site is protected by reCAPTCHA and the Google{' '}
              <Link href="https://policies.google.com/privacy">Privacy Policy</Link> and{' '}
              <Link href="https://policies.google.com/terms">Terms of Service</Link> apply.
            </Typography>
          </div>
          <div className="buttonNext">
            {currentIntakeFormStep < lastStepNumber - 1 && (
              <Button color="primary" variant="contained" onClick={handleClickNext}>
                Next
              </Button>
            )}
            {currentIntakeFormStep === lastStepNumber - 1 && (
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  // if the recaptcha token is invalid or expired, get a new one
                  if (!recaptchaRef.current.getValue()) {
                    recaptchaRef.current.execute();
                  } else {
                    handleSubmit(values, form);
                  }
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
  }),
);

import React from 'react';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import service from '../facade/service';
import { IntakeFormPage, validationSchema } from './components';
import { initialValues, formSteps } from '../fields';
import { uiStore } from '../injectables';

export const IntakeForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setCurrentIntakeFormStep } = uiStore;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        service.getDatabase().addNew(
          // formats the birth date field into UTC
          { ...values, birthDate: moment(values.birthDate).utc().format() },
          (docId) => {
            setSubmitting(false);
            enqueueSnackbar('Application successfully submitted.', {
              variant: 'success',
            });
            setCurrentIntakeFormStep(formSteps.length);
          },
          (error) => {
            setSubmitting(false);
            enqueueSnackbar('There was a problem submitting your application.', {
              variant: 'error',
            });
          },
        );
        
      }}
    >
      {(form) => <IntakeFormPage form={form} />}
    </Formik>
  );
};

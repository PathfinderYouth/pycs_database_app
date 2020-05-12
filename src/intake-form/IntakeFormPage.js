import React from 'react';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
<<<<<<< HEAD
import { initialValues, IntakeForm, validationSchema } from './components';
import service from '../facade/service';
=======
import { IntakeForm, validationSchema } from './components';
import { initialValues } from '../fields'
>>>>>>> Created base participant detail view page and participant edit page and connected them to the UI store.

export const IntakeFormPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      // placeholder onSubmit function
      onSubmit={(values, { setSubmitting }) => {
        service.getDatabase().addNew(values, (docId) => {
          setSubmitting(false);
          enqueueSnackbar('Application successfully submitted.', {
            variant: 'success',
          });
        }, (error) => {
          enqueueSnackbar('There was a problem submitting your application.', {
            variant: 'error'
          });
        });
      }}
    >
      {(form) => <IntakeForm form={form} />}
    </Formik>
  );
};

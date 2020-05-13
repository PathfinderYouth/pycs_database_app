import React from 'react';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { initialValues, IntakeForm, validationSchema } from './components';
import service from '../facade/service';

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

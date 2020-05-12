import React from 'react';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { initialValues, IntakeForm, validationSchema } from './components';

export const IntakeFormPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      // placeholder onSubmit function
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
          // TODO: display different snackbars depending on if submission was successful or not
          // on success
          enqueueSnackbar('Application successfully submitted.', {
            variant: 'success',
          });
          // on fail
          // enqueueSnackbar('There was a problem submitting your application.', { variant: 'error'})
        }, 400);
      }}
    >
      {(form) => <IntakeForm form={form} />}
    </Formik>
  );
};

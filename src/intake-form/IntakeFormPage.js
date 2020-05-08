import React from 'react';
import {
  IntakeForm,
  validationSchema,
  initialValues,
} from './components';
import { Formik } from 'formik';

export const IntakeFormPage = () => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    // placeholder onSubmit function
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    {(form) => <IntakeForm form={form} />}
  </Formik>
);

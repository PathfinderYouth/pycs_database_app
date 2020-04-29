import React from 'react';
import { IntakeForm } from './components';
import { Formik } from 'formik';
import { intakeFormInitialValues } from './fields';

// container that holds all intake form UI objects
export const IntakeFormPage = () => (
  <>
    <Formik
      initialValues={intakeFormInitialValues}
      // placeholder onSubmit function
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {(form) => <IntakeForm form={form} />}
    </Formik>
  </>
);

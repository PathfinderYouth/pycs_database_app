import React from 'react';
import { Formik } from 'formik';
import { FormFieldBuilder } from '../../../fields';
import { ParticipantDetailPageHeader } from './ParticipantDetailPageHeader';

export const ParticipantDetailForm = ({
  formTitle,
  initialValues,
  participantDetailViewMode,
  handleSubmit,
  handleClickChangeMode,
  step,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting);
      }}
    >
      {(form) => (
        <ParticipantDetailPageHeader
          title={`${formTitle} - ${step.stepName}`}
          handleSubmit={form.submitForm}
          participant={initialValues}
          participantDetailViewMode={participantDetailViewMode}
          handleClickChangeMode={handleClickChangeMode}
        >
          {step.fields.map((field) => (
            <FormFieldBuilder key={field.name} form={form} field={field} />
          ))}
        </ParticipantDetailPageHeader>
      )}
    </Formik>
  );
};
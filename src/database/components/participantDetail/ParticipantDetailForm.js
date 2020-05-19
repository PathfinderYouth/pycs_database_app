import React from 'react';
import moment from 'moment';
import { Formik } from 'formik';
import { FormFieldBuilder, detailPageValidationSchema } from '../../../fields';
import { ParticipantDetailPageHeader } from './ParticipantDetailPageHeader';

export const ParticipantDetailForm = ({
  formTitle,
  initialValues,
  participantDetailViewMode,
  handleSubmit,
  handleClickToggleEdit,
  step,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={detailPageValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // formats the birth date field into UTC
        const newValues = { ...values, birthDate: moment(values.birthDate).utc().format() };
        handleSubmit(newValues, setSubmitting);
      }}
    >
      {(form) => (
        <ParticipantDetailPageHeader
          title={`${formTitle} - ${step.stepName}`}
          participant={initialValues}
          form={form}
          participantDetailViewMode={participantDetailViewMode}
          handleClickToggleEdit={handleClickToggleEdit}
          handleClickSave={form.submitForm}
        >
          {step.fields.map((field) => (
            <FormFieldBuilder key={field.name} form={form} field={field} />
          ))}
        </ParticipantDetailPageHeader>
      )}
    </Formik>
  );
};

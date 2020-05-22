import React from 'react';
import moment from 'moment';
import { Formik } from 'formik';
import { detailPageValidationSchema, FormFieldBuilder } from '../../../fields';
import { ParticipantDetailPageHeader } from './ParticipantDetailPageHeader';

/**
 * Generic form component used by ParticipantDetailEdit and ParticipantDetailCreate
 * @param {string} formTitle title of the page
 * @param {Object} initialValues values to initialize the form - either empty or taken from participant data
 * @param {string} participantDetailViewMode current detail mode - view | edit | create
 * @param {function} handleSubmit onSubmit handler function
 * @param {function} handleClickToggleEdit toggle function that switches between view and edit mode in
 * UIStore
 * @param {Object} step form step object containing step name and array of fields
 */
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

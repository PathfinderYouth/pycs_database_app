import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { NumberMask } from './NumberMask';
import './FormSteps.css';

export const FormStepMedical = (props) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  } = props.form;
  return (
    <div className="fieldsContainer">
      <Typography gutterBottom variant="h4">
        Medical Information
      </Typography>
      <Typography gutterBottom variant="body2" color="textSecondary">
        * indicates a required field
      </Typography>
      <Typography gutterBottom variant="body2" color="textSecondary">
        Please note that by answering the following questions
        truthfully has no effect on your acceptance into the program.
      </Typography>
      <div className="formRow">
        <TextField
          name="doctorName"
          label="Doctor's name"
          value={values.doctorName}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          fullWidth
        />
        <TextField
          name="doctorPhone"
          label="Doctor's phone number"
          type="number"
          value={values.doctorPhone}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
        />
      </div>
      <div className="formRow">
        <TextField
          name="bcCareCardNumber"
          label="BC care card number"
          value={values.bcCareCardNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            !!errors['bcCareCardNumber'] &&
            touched['bcCareCardNumber']
          }
          helperText={
            !!errors['bcCareCardNumber'] &&
            touched['bcCareCardNumber'] &&
            errors['bcCareCardNumber']
          }
          variant="outlined"
          InputProps={{
            inputComponent: NumberMask,
          }}
        />
        <TextField
          name="numDependants"
          label="Number of dependants"
          type="number"
          value={values.numDependants}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
        />
      </div>
      <div className="formRow">
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            Do you have any medical conditions or take any medications
            that we should know about, please list condition and/or
            medication and dosages? (e.g., asthma, anxiety disorder,
            depression, mood disorder, diabetes, schizophrenia, etc.)
          </FormLabel>
          <TextField
            name="medicalConditions"
            value={values.medicalConditions}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
            multiline
          />
        </FormControl>
      </div>
      <div className="formRow">
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            Do you have any allergies? (e.g., foods, medication,
            perfume, paint, pollen, grass, dust, etc.)
          </FormLabel>
          <TextField
            name="allergies"
            value={values.allergies}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
            multiline
          />
        </FormControl>
      </div>
      <div className="formRow">
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            Do you have any fears that our program coordinator and
            facilitator should be aware of? (e.g., water, bees,
            heights, planes, etc.)
          </FormLabel>
          <TextField
            name="fears"
            value={values.fears}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
            multiline
          />
        </FormControl>
      </div>
      <div className="formRow">
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            Do you have/did you have any past drug and/or alcohol
            addictions? Please note type of addiction and name of
            drug(s).
          </FormLabel>
          <TextField
            name="addictions"
            value={values.addictions}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
            multiline
          />
        </FormControl>
      </div>
    </div>
  );
};

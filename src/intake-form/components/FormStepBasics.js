import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { provinces } from '../fields';
import './FormSteps.css';


export const FormStepBasics = (props) => {
  const { form } = props;
  const { values, handleChange, handleBlur } = form;

  const calculateAge = () => {
    const today = new Date();
    const { birthDate } = values;
    if (birthDate !== '') {
      const birthday = new Date(birthDate);
      let age = today.getFullYear() - birthday.getFullYear();
      if (today.getMonth() < birthday.getMonth()) {
        age--;
      } else if (today.getMonth() === birthday.getMonth()) {
        if (today.getDate() < birthday.getDate() + 1) {
          age--;
        }
      }
      return `${age} years old`;
    }
  };

  const emergencyContactFields = (number) => {
    const fieldPath = `eContact${number}`;
    return (
      <>
        <Typography
          gutterBottom
          variant="body2"
          color="textSecondary"
        >{`Emergency contact ${number}`}</Typography>
        <div className="formRow">
          <TextField
            name={`emergencyContacts.${fieldPath}.name`}
            label="Emergency contact name"
            value={values.emergencyContacts[fieldPath].name}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
          />
          <TextField
            name={`emergencyContacts.${fieldPath}.relationship`}
            label="Relationship to you"
            value={values.emergencyContacts[fieldPath].relationship}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="formRow">
          <TextField
            name={`emergencyContacts.${fieldPath}.phoneHome`}
            label="Home phone"
            type="number"
            value={values.emergencyContacts[fieldPath].phoneHome}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
          />
          <TextField
            name={`emergencyContacts.${fieldPath}.phoneWork`}
            label="Work phone"
            type="number"
            value={values.emergencyContacts[fieldPath].phoneWork}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
          />
          <TextField
            name={`emergencyContacts.${fieldPath}.phoneCell`}
            label="Cell phone"
            type="number"
            value={values.emergencyContacts[fieldPath].phoneCell}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
          />
        </div>
      </>
    );
  };

  return (
    <div className="fieldsContainer">
      <Typography gutterBottom variant="h4">
        Basic Information
      </Typography>
      <Typography gutterBottom variant="body2" color="textSecondary">
        * indicates a required field
      </Typography>
      <div className="formRow">
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Program applying for:
          </FormLabel>
          <RadioGroup
            aria-label="programAppliedFor"
            name="programAppliedFor"
            value={values.programAppliedFor}
            onChange={handleChange}
            onBlur={handleBlur}
            row
          >
            <FormControlLabel
              value="new employment beginnings"
              control={<Radio />}
              label="New Employment Beginnings"
            />
            <FormControlLabel
              value="bean around books"
              control={<Radio />}
              label="Bean Around Books - Employment Experience"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <Typography color="textSecondary">Address</Typography>
      <div className="formRow">
        <TextField
          name="addressStreet"
          label="Street address"
          value={values.addressStreet}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="formRow">
        <TextField
          name="addressCity"
          label="City"
          value={values.addressCity}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
        />
        <TextField
          name="addressProvince"
          label="Province"
          value={values.addressProvince}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          select
        >
          {provinces.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="addressPostalCode"
          label="Postal code"
          value={values.addressPostalCode}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
        />
        <TextField
          name="timeLivedAtAddress"
          label="Time lived at this address"
          value={values.timeLivedAtAddress}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          fullWidth
        />
      </div>
      <Typography color="textSecondary">Phone</Typography>
      <div className="formRow">
        <TextField
          name="phoneHome"
          label="Home phone"
          type="number"
          value={values.phoneHome}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
        />
        <TextField
          name="phoneCell"
          label="Cell phone"
          type="number"
          value={values.phoneCell}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Best number to call:
          </FormLabel>
          <RadioGroup
            aria-label="bestNumberToCall"
            name="bestNumberToCall"
            value={values.bestNumberToCall}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value="home"
              control={<Radio />}
              label="Home"
            />
            <FormControlLabel
              value="cell"
              control={<Radio />}
              label="Cell"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <Typography color="textSecondary">Birthdate</Typography>
      <div className="formRow">
        <TextField
          label="Birthdate"
          type="date"
          name="birthDate"
          value={values.birthDate}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Typography>{calculateAge()}</Typography>
      </div>
      <Typography color="textSecondary">
        Emergency contacts
      </Typography>
      {emergencyContactFields(1)}
      {emergencyContactFields(2)}
    </div>
  );
};

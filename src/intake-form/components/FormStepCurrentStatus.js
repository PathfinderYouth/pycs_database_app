import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { NumberMask } from './NumberMask';
import './FormSteps.css';

export const FormStepCurrentStatus = (props) => {
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
        Current Status
      </Typography>
      <Typography gutterBottom variant="body2" color="textSecondary">
        * indicates a required field
      </Typography>
      <div className="formRow">
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            Have you ever been in trouble with the law or on parole?
            Please explain.
          </FormLabel>
          <TextField
            name="lawTrouble"
            value={values.lawTrouble}
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
            What is your current form of transportation? (e.g., bus,
            walk, drive, bicycle, get a ride, etc.)
          </FormLabel>
          <TextField
            name="formOfTransportation"
            value={values.formOfTransportation}
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
            What is your current housing situation? (e.g., rent, live
            with family, couch surfing, homeless, foster care, etc.)
          </FormLabel>
          <TextField
            name="housingSituation"
            value={values.housingSituation}
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
            How much do you pay for rent per month? (Please put $0 if
            you are not required to pay rent at your place of
            residence or where you are staying)
          </FormLabel>
          <TextField
            name="rent"
            type="number"
            value={values.rent}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            fullWidth
          />
        </FormControl>
      </div>
      <div className="formRow">
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            Are you physically active? If yes, list the activities you
            currently do. (e.g., walking, jogging, enrolled in a gym,
            weight lifting, karate, swimming, etc.)
          </FormLabel>
          <TextField
            name="physicalActivities"
            value={values.physicalActivities}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
            multiline
          />
        </FormControl>
      </div>
      <div className="formRow">
        <div className="radioGroup">
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Do you have a bank account?
            </FormLabel>
            <RadioGroup
              aria-label="hasBankAccount"
              name="hasBankAccount"
              value={values.hasBankAccount}
              onChange={handleChange}
              onBlur={handleBlur}
              row
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="radioGroup">
          <FormControl component="fieldset">
            <FormLabel component="legend">
              If yes, is it a chequing or savings account or do you
              have both?
            </FormLabel>
            <RadioGroup
              aria-label="bankAccountType"
              name="bankAccountType"
              value={values.bankAccountType}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="chequing"
                control={<Radio />}
                label="Chequing"
                disabled={values.hasBankAccount !== 'true'}
              />
              <FormControlLabel
                value="savings"
                control={<Radio />}
                label="Savings"
                disabled={values.hasBankAccount !== 'true'}
              />
              <FormControlLabel
                value="chequing and savings"
                control={<Radio />}
                label="Both"
                disabled={values.hasBankAccount !== 'true'}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="formRow">
        <TextField
          name="sin"
          label="Social insurance number"
          value={values.sin}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors['sin'] && touched['sin']}
          helperText={
            !!errors['sin'] && touched['sin'] && errors['sin']
          }
          variant="outlined"
          style={{ minWidth: '15em' }}
          required
          InputProps={{
            inputComponent: NumberMask,
          }}
        />
      </div>
      <div className="formRow">
        <div className="radioGroup">
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">
              Citizenship status
            </FormLabel>
            <RadioGroup
              aria-label="citizenshipStatus"
              name="citizenshipStatus"
              value={values.citizenshipStatus}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="canadian citizen"
                control={<Radio />}
                label="Canadian citizen"
              />
              <FormControlLabel
                value="permanent resident"
                control={<Radio />}
                label="Permanent resident"
              />
              <FormControlLabel
                value="native canadian"
                control={<Radio />}
                label="Native Canadian"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="radioGroup">
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Are you legally entitled to work in Canada?
            </FormLabel>
            <RadioGroup
              aria-label="isEntitledToWork"
              name="isEntitledToWork"
              value={values.entitledToWork}
              onChange={handleChange}
              onBlur={handleBlur}
              row
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="formRow">
        <div className="radioGroup">
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Do you have any health or physical concerns that may
              affect your ability to participate in our program?
            </FormLabel>
            <RadioGroup
              aria-label="hasHealthConcerns"
              name="hasHealthConcerns"
              value={values.hasHealthConcerns}
              onChange={handleChange}
              onBlur={handleBlur}
              row
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <TextField
          name="healthConcerns"
          label="If yes, please specify"
          value={values.healthConcerns}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          disabled={values.hasHealthConcerns !== 'true'}
          fullWidth
        />
      </div>
      <div className="formRow">
        <div className="radioGroup">
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Do you have a valid driver's licence?
            </FormLabel>
            <RadioGroup
              aria-label="hasValidDriversLicense"
              name="hasValidDriversLicense"
              value={values.hasValidDriversLicense}
              onChange={handleChange}
              onBlur={handleBlur}
              row
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="radioGroup">
          <FormControl component="fieldset">
            <FormLabel component="legend">
              If yes, what type of driver's license is it?
            </FormLabel>
            <RadioGroup
              aria-label="driversLicenseType"
              name="driversLicenseType"
              value={values.driversLicenseType}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="learners"
                control={<Radio />}
                label="Learner's"
                disabled={values.hasValidDriversLicense !== 'true'}
              />
              <FormControlLabel
                value="new driver"
                control={<Radio />}
                label="New driver"
                disabled={values.hasValidDriversLicense !== 'true'}
              />
              <FormControlLabel
                value="full"
                control={<Radio />}
                label="Full license"
                disabled={values.hasValidDriversLicense !== 'true'}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="radioGroup">
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Do you have access to a vehicle?
            </FormLabel>
            <RadioGroup
              aria-label="hasAccessToVehicle"
              name="hasAccessToVehicle"
              value={values.hasAccessToVehicle}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="radioGroup">
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            How did you find out about our program?
          </FormLabel>
          <RadioGroup
            aria-label="learnedAboutPathfinder"
            name="learnedAboutPathfinder"
            value={values.learnedAboutPathfinder}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value="family/friends"
              control={<Radio />}
              label="Family and/or friends"
            />
            <FormControlLabel
              value="teacher/counselor"
              control={<Radio />}
              label="Teacher/counselor"
            />
            <FormControlLabel
              value="poster"
              control={<Radio />}
              label="Our poster"
            />
            <FormControlLabel
              value="probation officer"
              control={<Radio />}
              label="Probation officer"
            />
            <FormControlLabel
              value="social worker"
              control={<Radio />}
              label="Social worker"
            />
            <FormControlLabel
              value="government agency"
              control={<Radio />}
              label="Government agency"
            />
            <FormControlLabel
              value="employment office"
              control={<Radio />}
              label="Employment office"
            />
            <FormControlLabel
              value="case manager"
              control={<Radio />}
              label="Case manager"
            />
            <FormControlLabel
              value="website"
              control={<Radio />}
              label="Website"
            />
            <FormControlLabel
              value="community agency"
              control={<Radio />}
              label="Community agency"
            />
            <FormControlLabel
              value="drug counselor"
              control={<Radio />}
              label="Drug counselor"
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="Other"
            />
          </RadioGroup>
          <TextField
            name="learnedAboutPathfinderOther"
            label="If other, please specify"
            value={values.learnedAboutPathfinderOther}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            disabled={values.learnedAboutPathfinder !== 'other'}
            fullWidth
          />
        </FormControl>
      </div>
      <div className="radioGroup">
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            What is your current form of income?
          </FormLabel>
          <RadioGroup
            aria-label="formOfIncome"
            name="formOfIncome"
            value={values.formOfIncome}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value="one"
              control={<Radio />}
              label="None"
            />
            <FormControlLabel
              value="employment insurance"
              control={<Radio />}
              label="Employment insurance"
            />
            <FormControlLabel
              value="social assistance"
              control={<Radio />}
              label="Social assistance"
            />
            <FormControlLabel
              value="part-time job"
              control={<Radio />}
              label="Part-time job"
            />
            <FormControlLabel
              value="full-time job"
              control={<Radio />}
              label="Full-time job"
            />
            <FormControlLabel
              value="family support"
              control={<Radio />}
              label="Family support"
            />
            <FormControlLabel
              value="band funding"
              control={<Radio />}
              label="Band funding"
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="Other"
            />
          </RadioGroup>
          <TextField
            name="formOfIncomeOther"
            label="If other, please specify"
            value={values.formOfIncomeOther}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            disabled={values.formOfIncome !== 'other'}
            fullWidth
          />
        </FormControl>
      </div>
      <div className="radioGroup">
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            What is the highest level of education you have completed?
          </FormLabel>
          <RadioGroup
            aria-label="levelOfEducation"
            name="levelOfEducation"
            value={values.levelOfEducation}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value="less than grade 9"
              control={<Radio />}
              label="Less than grade 9"
            />
            <FormControlLabel
              value="grade 9"
              control={<Radio />}
              label="Grade 9"
            />
            <FormControlLabel
              value="grade 10"
              control={<Radio />}
              label="Grade 10"
            />
            <FormControlLabel
              value="grade 11"
              control={<Radio />}
              label="Grade 11"
            />
            <FormControlLabel
              value="some grade 12"
              control={<Radio />}
              label="Some grade 12"
            />
            <FormControlLabel
              value="grade 12 diploma"
              control={<Radio />}
              label="Grade 12 diploma"
            />
            <FormControlLabel
              value="trade certificate/diploma"
              control={<Radio />}
              label="Trade certificate/diploma"
            />
            <FormControlLabel
              value="some university/college"
              control={<Radio />}
              label="Some university/college"
            />
            <FormControlLabel
              value="university degree/college diploma"
              control={<Radio />}
              label="University degree/college diploma"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="formRow">
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            Please provide the name of the High School or College you
            last attended and the city and province it’s located in.
          </FormLabel>
          <TextField
            name="nameAndLocationOfSchool"
            value={values.nameAndLocationOfSchool}
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
            Have you ever attended a job club or paid employment
            training program?
          </FormLabel>
          <RadioGroup
            aria-label="hasEmploymentProgramTraining"
            name="hasEmploymentProgramTraining"
            value={values.hasEmploymentProgramTraining}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Yes"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="formRow">
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            If yes, what month and year, program name and where?
          </FormLabel>
          <TextField
            name="employmentProgramInfo"
            value={values.employmentProgramInfo}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            disabled={values.hasEmploymentProgramTraining !== 'true'}
            fullWidth
            multiline
          />
        </FormControl>
        <div className="radioGroup">
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Did you complete the program?
            </FormLabel>
            <RadioGroup
              aria-label="hasEmploymentProgramComplete"
              name="hasEmploymentProgramComplete"
              value={values.hasEmploymentComplete}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Yes"
                disabled={
                  values.hasEmploymentProgramTraining !== 'true'
                }
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="No"
                disabled={
                  values.hasEmploymentProgramTraining !== 'true'
                }
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="formRow">
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            What have you been doing for the last six months?
          </FormLabel>
          <TextField
            name="sixMonthsHistory"
            value={values.sixMonthsHistory}
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

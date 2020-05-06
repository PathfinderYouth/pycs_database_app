import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { FormCheckBox } from './FormCheckBox';
import './FormSteps.css';

export const FormStepQuestions = (props) => {
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
        Questions
      </Typography>
      <Typography gutterBottom variant="body2" color="textSecondary">
        * indicates a required field
      </Typography>
      <div className="formRow">
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            What aspects of your present situation would you like to
            change? (check two)
          </FormLabel>
          <FormGroup>
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="presentSituationAspects"
              fieldValue="Increase my self confidence"
              maxChecked={2}
            />
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="presentSituationAspects"
              fieldValue="Have more money and/or get out of poverty"
              maxChecked={2}
            />
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="presentSituationAspects"
              fieldValue="Increase my skills for the work force"
              maxChecked={2}
            />
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="presentSituationAspects"
              fieldValue="Control or eliminate my drug/alcohol use"
              maxChecked={2}
            />
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="presentSituationAspects"
              fieldValue="Stop running into trouble with the law"
              maxChecked={2}
            />
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="presentSituationAspects"
              fieldValue="Other"
              maxChecked={2}
            />
          </FormGroup>
          <TextField
            name="presentSituationOther"
            label="If other, please specify"
            value={values.presentSituationOther}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            disabled={
              !values.presentSituationAspects.includes('Other')
            }
            fullWidth
          />
        </FormControl>
      </div>
      <div className="formRow">
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            What are your two most urgent needs? (check two)
          </FormLabel>
          <FormGroup>
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="urgentNeeds"
              fieldValue="Basic needs (food, shelter and clothing)"
              maxChecked={2}
            />
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="urgentNeeds"
              fieldValue="The need to be independent"
              maxChecked={2}
            />
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="urgentNeeds"
              fieldValue="The need to meet people in the same situation as me"
              maxChecked={2}
            />
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="urgentNeeds"
              fieldValue="The need for personal growth and self-esteem"
              maxChecked={2}
            />
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="urgentNeeds"
              fieldValue="The need to be active"
              maxChecked={2}
            />
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="urgentNeeds"
              fieldValue="Other"
              maxChecked={2}
            />
          </FormGroup>
          <TextField
            name="urgentNeedsOther"
            label="If other, please specify"
            value={values.urgentNeedsOther}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            disabled={!values.urgentNeeds.includes('Other')}
            fullWidth
          />
        </FormControl>
      </div>
      <div className="formRow">
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            How long have you been out of work since
            your last job or since you left school?
          </FormLabel>
          <RadioGroup
            aria-label="timeOutOfWork"
            name="timeOutOfWork"
            value={values.timeOutOfWork}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value="less than 6 months"
              control={<Radio />}
              label="Less than 6 months"
            />
            <FormControlLabel
              value="6 months to 1 year"
              control={<Radio />}
              label="6 months to 1 year"
            />
            <FormControlLabel
              value="1 year to 3 years"
              control={<Radio />}
              label="1 year to 3 years"
            />
            <FormControlLabel
              value="3 years to 5 years"
              control={<Radio />}
              label="3 years to 5 years"
            />
            <FormControlLabel
              value="5 years or more"
              control={<Radio />}
              label="5 years or more"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="formRow">
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            What is the main reason you are unemployed? (check all
            that apply to you)
          </FormLabel>
          <FormGroup>
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="reasonsForUnemployment"
              fieldValue="I have just completed school or another training program"
            />
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="reasonsForUnemployment"
              fieldValue="I do not know how to do a good job search on my own"
            />
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="reasonsForUnemployment"
              fieldValue="I do not know what I want to do"
            />
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="reasonsForUnemployment"
              fieldValue="I have no experience"
            />
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="reasonsForUnemployment"
              fieldValue="I have a physical and/or mental health problem"
            />
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="reasonsForUnemployment"
              fieldValue="I had no interest in working"
            />
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="reasonsForUnemployment"
              fieldValue="I have a drug and/or alcohol addiction problem"
            />
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="reasonsForUnemployment"
              fieldValue="I do not have appropriate interview attire or my physical appearance needs improvement"
            />
            <FormCheckBox
              values={values}
              handleChange={handleChange}
              fieldName="reasonsForUnemployment"
              fieldValue="Other"
            />
          </FormGroup>
          <TextField
            name="reasonsForUnemploymentOther"
            label="If other, please specify"
            value={values.reasonsForUnemploymentOther}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
            disabled={
              !values.reasonsForUnemployment.includes('Other')
            }
          />
        </FormControl>
      </div>
      <div className="formRow">
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            What do you hope to gain from our program when you
            graduate?
          </FormLabel>
          <TextField
            name="hopeToGainFromProgram"
            value={values.hopeToGainFromProgram}
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
            Who do you admire most? Why?
          </FormLabel>
          <TextField
            name="admiresMost"
            value={values.admiresMost}
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
            What are your hobbies? (e.g., singing,
            painting, beading, dancing, etc.)
          </FormLabel>
          <TextField
            name="hobbies"
            value={values.hobbies}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
            multiline
          />
        </FormControl>
      </div>
      <div className="formRow">
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Do you consider yourself to be:
          </FormLabel>
          <RadioGroup
            aria-label="personality"
            name="personality"
            value={values.personality}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value="shy/introverted"
              control={<Radio />}
              label="Shy/introverted"
            />
            <FormControlLabel
              value="sociable"
              control={<Radio />}
              label="Sociable"
            />
            <FormControlLabel
              value="extroverted"
              control={<Radio />}
              label="Extrovered"
            />
            <FormControlLabel
              value="quiet/reserved"
              control={<Radio />}
              label="Quiet/reserved"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="formRow">
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Do you have any brothers or sisters?
          </FormLabel>
          <RadioGroup
            aria-label="hasSiblings"
            name="hasSiblings"
            value={values.hasSiblings}
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
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            If yes, who do you like the most and why?
          </FormLabel>
          <TextField
            name="siblings"
            value={values.siblings}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            disabled={values.hasSiblings !== 'true'}
            fullWidth
            multiline
          />
        </FormControl>
      </div>
      <div className="formRow">
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Do you have any children?
          </FormLabel>
          <RadioGroup
            aria-label="hasChildren"
            name="hasChildren"
            value={values.hasChildren}
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
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            If yes, how many and what are their names?
          </FormLabel>
          <TextField
            name="children"
            value={values.children}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            disabled={values.hasChildren !== 'true'}
            fullWidth
            multiline
          />
        </FormControl>
      </div>
      <div className="formRow">
        <FormControl component="fieldset">
          <FormLabel component="legend">
            How many job interviews have you been to in the last 6
            months?
          </FormLabel>
          <TextField
            name="numberOfJobInterviews"
            type="number"
            value={values.numberOfJobInterviews}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
          />
        </FormControl>
      </div>
      <div className="formRow">
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Have you ever volunteered?
          </FormLabel>
          <RadioGroup
            aria-label="hasVolunteered"
            name="hasVolunteered"
            value={values.hasVolunteered}
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
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            If yes, where and why did you volunteer and what did you
            do for the organization?
          </FormLabel>
          <TextField
            name="volunteerInfo"
            value={values.volunteerInfo}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            disabled={values.hasVolunteered !== 'true'}
            fullWidth
            multiline
          />
        </FormControl>
      </div>
      <div className="formRow">
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Have you ever travelled outside British Columbia?
          </FormLabel>
          <RadioGroup
            aria-label="hasTravelledOutsideBC"
            name="hasTravelledOutsideBC"
            value={values.hasTravelledOutsideBC}
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
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Are you currently in any community rehab programs or
            addictions support services?
          </FormLabel>
          <RadioGroup
            aria-label="inRehabOrAddictionsServices"
            name="inRehabOrAddictionsServices"
            value={values.inRehabOrAddictionsServices}
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
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Do you have a current resume and cover page?
          </FormLabel>
          <RadioGroup
            aria-label="hasResume"
            name="hasResume"
            value={values.hasResume}
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
            Why have you applied to the Pathfinder Youth Centre
            Society’s Program?
          </FormLabel>
          <TextField
            name="whyApplied"
            value={values.whyApplied}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors['whyApplied'] && touched['whyApplied']}
            helperText={
              !!errors['whyApplied'] &&
              touched['whyApplied'] &&
              errors['whyApplied']
            }
            variant="outlined"
            required
            fullWidth
            multiline
          />
        </FormControl>
      </div>
      <div className="formRow">
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            Why should you be accepted?
          </FormLabel>
          <TextField
            name="whyShouldBeAccepted"
            value={values.whyShouldBeAccepted}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              !!errors['whyShouldBeAccepted'] &&
              touched['whyShouldBeAccepted']
            }
            helperText={
              !!errors['whyShouldBeAccepted'] &&
              touched['whyShouldBeAccepted'] &&
              errors['whyShouldBeAccepted']
            }
            variant="outlined"
            required
            fullWidth
            multiline
          />
        </FormControl>
      </div>
      <div className="formRow">
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            What are your employment goals one year from now?
          </FormLabel>
          <TextField
            name="employmentGoals"
            value={values.employmentGoals}
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
            What types of skills and experiences do you hope to gain
            through your participation in this program?
          </FormLabel>
          <TextField
            name="skillsAndExperienceHopes"
            value={values.skillsAndExperienceHopes}
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

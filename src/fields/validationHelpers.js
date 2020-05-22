import * as yup from 'yup';
import moment from 'moment';

/**
 * Validates SIN using the Luhn algorithm
 * @param {string} sinString social insurance number as a numeric string
 */
const sinValidation = (sinString) => {
  const sin = String(sinString).split('');
  const luhnNumber = [1, 2, 1, 2, 1, 2, 1, 2, 1];
  let total = 0;
  for (let i = 0; i < sin.length; i++) {
    const sinVal = parseInt(sin[i]);
    const product = sinVal * luhnNumber[i];
    if (product > 9) {
      total += product - 10 + 1;
    } else {
      total += product;
    }
  }
  return total % 10 === 0;
};

/**
 * Calculates the age of a participant by counting the number of years since they were born
 * @param {string} dateString date string in the format YYYY-MM-DD
 * @return {int} age
 */
export const calculateAge = (dateString) => {
  const today = new moment();
  if (dateString !== '') {
    return today.diff(moment(dateString), 'years');
  }
};

/**
 * Validation that ensures participants are between 15 and 30 years old
 * @param {string} dateString date string in the format YYYY-MM-DD
 * @return {boolean} age between 15 and 30
 */
const ageValidation = (dateString) => {
  const age = calculateAge(dateString);
  return age >= 15 && age <= 30;
};

/**
 * Validates that the number string (if not empty) is a positive value
 * @param {string} numberString numerical string
 */
const positiveNumberValidation = (numberString) => {
  if (!!numberString) {
    const number = parseInt(numberString);
    return number > -1;
  } else {
    return true; // bypass validation if field is empty
  }
};

// Validation schema object shared between the intake form and the participant edit & create page forms
const commonValidationSchema = {
  nameGiven: yup.string().required('Given name is required'),
  nameLast: yup.string().required('Last name is required'),
  addressPostalCode: yup
    .string()
    .matches(
      /^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/,
      'Invalid postal code, must be in the format A1A 1A1',
    ),
  phoneHome: yup
    .string()
    .length(10, 'Must be 10 digits long')
    .when(['phoneCell', 'email'], {
      is: (phoneCell, email) => !phoneCell && !email,
      then: yup.string().required('A contact method is required'),
    }),
  phoneCell: yup
    .string()
    .length(10, 'Must be 10 digits long')
    .when(['phoneHome', 'email'], {
      is: (phoneHome, email) => !phoneHome && !email,
      then: yup.string().required('A contact method is required'),
    }),
  email: yup
    .string()
    .email('Invalid email address')
    .when(['phoneHome', 'phoneCell'], {
      is: (phoneHome, phoneCell) => !phoneHome && !phoneCell,
      then: yup.string().required('A contact method is required'),
    }),
  birthDate: yup
    .date()
    .required('Birth date is required')
    .test('age-test', 'Must be between 15 and 30 years old', (value) => ageValidation(value)),
  sin: yup
    .string()
    .required('SIN is required')
    .length(9, 'Must be 9 digits long')
    .test('sin-valid', 'Invalid SIN', (value) => sinValidation(value)),
  rent: yup
    .string()
    .test('positive-test', 'Must be a positive numerical value', (value) =>
      positiveNumberValidation(value),
    ),
  numDependants: yup
    .string()
    .test('positive-test', 'Must be a positive numerical value', (value) =>
      positiveNumberValidation(value),
    ),
};

// Validation schema used by the intake form
export const validationSchema = yup.object().shape(
  {
    ...commonValidationSchema,
    programAppliedFor: yup.string().required('Must select an option'),
    emergencyContact1PhoneHome: yup.string().length(10, 'Must be 10 digits long'),
    emergencyContact1PhoneWork: yup.string().length(10, 'Must be 10 digits long'),
    emergencyContact1PhoneCell: yup.string().length(10, 'Must be 10 digits long'),
    emergencyContact2PhoneHome: yup.string().length(10, 'Must be 10 digits long'),
    emergencyContact2PhoneWork: yup.string().length(10, 'Must be 10 digits long'),
    emergencyContact2PhoneCell: yup.string().length(10, 'Must be 10 digits long'),
    gender: yup.string().required('Please select an option'),
    memberOfAVisibleMinority: yup.string().required('Please select an option'),
    personWithDisability: yup.string().required('Please select an option'),
    indigenousGroup: yup.string().required('Please select an option'),
    newImmigrant: yup.string().required('Please select an option'),
    levelOfEducation: yup.string().required('Please select an option'),
    bcCareCardNumber: yup
      .string()
      .required('BC care card number is required')
      .test('phn-format', 'Invalid care card number', (value) =>
        value !== undefined ? value.charAt(0) === '9' : false,
      )
      .length(10, 'Must be 10 digits long'),
    whyApplied: yup.string().required('Please enter the reason you applied to Pathfinder'),
    whyShouldBeAccepted: yup
      .string()
      .required('Please enter why you think you should be accepted to Pathfinder'),
    hasMentalHealthIssues: yup.string().required('Please select an option'),
    housingSituation: yup.string().required('Please select an option'),
  },
  [
    ['phoneHome', 'phoneCell'],
    ['phoneHome', 'email'],
    ['phoneCell', 'email'],
  ],
);

// Validation schema used by the participant detail edit and create forms
export const detailPageValidationSchema = yup.object().shape(
  {
    ...commonValidationSchema,
  },
  [
    ['phoneHome', 'phoneCell'],
    ['phoneHome', 'email'],
    ['phoneCell', 'email'],
  ],
);

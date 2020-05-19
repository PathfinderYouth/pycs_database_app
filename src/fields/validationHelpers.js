import * as yup from 'yup';

/**
 * Validates SIN using the Luhn algorithm
 * @param value: int
 */
const sinValidation = (value) => {
  const sin = String(value).split('');
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

export const calculateAge = (value) => {
  const today = new Date();
  const birthDate = value;
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
    return age;
  }
};

/**
 * Validation that ensures participants are between 15 and 30 years old
 * @param value: date object
 */
const ageValidation = (value) => {
  const age = calculateAge(value);
  return age >= 15 && age <= 30;
};

const commonValidationSchema = {
  nameGiven: yup.string().required('Given name is required'),
  nameLast: yup.string().required('Last name is required'),
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
    .required('Birthdate is required')
    .test('age-test', 'Must be between 15 and 30 years old', (value) => ageValidation(value)),
  sin: yup
    .string()
    .required('SIN is required')
    .length(9, 'Must be 9 digits long')
    .test('sin-valid', 'Invalid SIN', (value) => sinValidation(value)),
};

export const validationSchema = yup.object().shape(
  {
    ...commonValidationSchema,
    programAppliedFor: yup.string().required('Must select an option'),
    addressPostalCode: yup
      .string()
      .matches(/^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/, 'Invalid postal code'),
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
      .test('phn-format', 'Invalid care card number', (value) =>
        value !== undefined ? value.charAt(0) === '9' : false,
      )
      .required('BC care card number is required')
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

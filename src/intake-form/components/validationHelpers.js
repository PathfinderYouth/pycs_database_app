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
 * Validation to prevent negative ages/setting they year in the future.
 * We may want to update this method if Pathfinder says they only accept a certain age range for participants
 * @param value: date object
 */
const ageValidation = (value) => calculateAge(value) >= 0;

export const validationSchema = yup.object().shape({
  nameGiven: yup.string().required('Given name is required'),
  nameLast: yup.string().required('Last name is required'),
  programAppliedFor: yup.string().required('Must select an option'),

  // verifies at least one of home phone, cell phone, or email are used
  contactMethod: yup
    .bool()
    .when(['phoneHome', 'phoneCell', 'email'], {
      is: (home, cell, email) =>
        (!home && !cell && !email) || (!!home && !!cell && !!email),
      then: yup.bool().required('A contact method is required'),
      otherwise: yup.bool(),
    }),
  phoneHome: yup.string().length(10, 'Must be 10 digits long'),
  phoneCell: yup.string().length(10, 'Must be 10 digits long'),
  email: yup.string().email('Invalid email address'),
  birthDate: yup
    .date()
    .required('Birthdate is required')
    .test('negative-date-test', 'Invalid date', (value) =>
      ageValidation(value),
    ),
  bcCareCardNumber: yup
    .string()
    .test('phn-format', 'Invalid care card number', (value) =>
      value !== undefined ? value.charAt(0) === '9' : false,
    )
    .required('BC care card number is required')
    .length(10, 'Must be 10 digits long'),
  sin: yup
    .string()
    .required('SIN is required')
    .length(9, 'Must be 9 digits long')
    .test('sin-valid', 'Invalid SIN', (value) =>
      sinValidation(value),
    ),
  whyApplied: yup
    .string()
    .required('Please enter the reason you applied to Pathfinder'),
  whyShouldBeAccepted: yup
    .string()
    .required(
      'Please enter why you think you should be accepted to Pathfinder',
    ),
});

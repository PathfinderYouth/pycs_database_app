export const formSteps = [
  {
    stepName: 'Basic Information',
    fields: [
      {
        name: 'nameGiven',
        label: 'Given name(s)',
        type: 'text',
        size: 6,
        required: true,
      },
      {
        name: 'nameLast',
        label: 'Last name',
        type: 'text',
        size: 6,
        required: true,
      },
      {
        name: 'addressStreet',
        label: 'Street address',
        type: 'text',

        size: 8,
      },
      {
        name: 'addressCity',
        label: 'City',
        type: 'text',
      },
      {
        name: 'addressProvince',
        label: 'Province',
        type: 'select',
        size: 4,
        options: [
          'Alberta',
          'British Columbia',
          'Manitoba',
          'New Brunswick',
          'Newfoundland & Labrador',
          'Northwest Territories',
          'Nova Scotia',
          'Nunavut',
          'Ontario',
          'Prince Edward Island',
          'Quebec',
          'Saskatchewan',
          'Yukon Territory',
        ],
      },
      {
        name: 'addressPostalCode',
        label: 'Postal code',
        size: 4,
        type: 'text',
      },
      {
        name: 'addressTimeLivedAt',
        label: 'Time lived here',
        size: 4,
        type: 'text',
      },
      {
        name: 'phoneHome',
        label: 'Home phone',
        type: 'text',
        mask: true,
        size: 4,
        required: true,
      },
      {
        name: 'phoneCell',
        label: 'Cell phone',
        type: 'text',
        size: 4,
        mask: true,
        required: true,
      },
      {
        name: 'phoneHomeOrCell',
        label: 'Best number to call:',
        type: 'radio',
        size: 4,
        options: ['Home', 'Cell'],
      },
      {
        name: 'email',
        label: 'Email address',
        type: 'email',
        size: 6,
        required: true,
      },
      {
        name: 'birthDate',
        label: 'Date of Birth',
        type: 'date',
        size: 6,
        required: true,
      },
      {
        name: 'emergencyContact1Name',
        description: 'Emergency contact 1',
        label: 'Emergency contact name',
        type: 'text',
        size: 12,
      },
      {
        name: 'emergencyContact1Relationship',
        label: 'Relationship to you',
        type: 'text',
        size: 12,
      },
      {
        name: 'emergencyContact1PhoneHome',
        label: 'Home phone',
        type: 'text',
        size: 4,
        mask: true,
      },
      {
        name: 'emergencyContact1PhoneWork',
        label: 'Work phone',
        type: 'text',
        size: 4,
        mask: true,
      },
      {
        name: 'emergencyContact1PhoneCell',
        label: 'Cell phone',
        type: 'text',
        size: 4,
        mask: true,
      },
      {
        name: 'emergencyContact2Name',
        description: 'Emergency contact 2',
        label: 'Emergency contact name',
        type: 'text',
        size: 12,
      },
      {
        name: 'emergencyContact2Relationship',
        label: 'Relationship to you',
        type: 'text',
        size: 12,
      },
      {
        name: 'emergencyContact2PhoneHome',
        label: 'Home phone',
        type: 'text',
        size: 4,
        mask: true,
      },
      {
        name: 'emergencyContact2PhoneWork',
        label: 'Work phone',
        type: 'text',
        size: 4,
        mask: true,
      },
      {
        name: 'emergencyContact2PhoneCell',
        label: 'Cell phone',
        type: 'text',
        size: 4,
        mask: true,
      },
    ],
  },
  {
    stepName: 'Program Information',
    fields: [
      {
        name: 'programAppliedFor',
        label: 'Program applying for:',
        type: 'radio',
        required: true,
        size: 12,
        options: ['New Employment Beginnings', 'Bean Around Books - Employment Experience'],
      },
      {
        name: 'hopeToGainFromProgram',
        type: 'text',
        size: 12,
        description: 'What do you hope to gain from our program when you graduate?',
        multiline: true,
      },
      {
        name: 'whyApplied',
        type: 'text',
        size: 12,
        description: 'Why have you applied to the Pathfinder Youth Centre Society’s Program? *',
        multiline: true,
        required: true,
      },
      {
        name: 'whyShouldBeAccepted',
        size: 12,
        type: 'text',
        description: 'Why should you be accepted? *',
        multiline: true,
        required: true,
      },
      {
        name: 'skillsAndExperienceHopes',
        type: 'text',
        size: 12,
        description:
          'What types of skills and experiences do you hope to gain through your participation in this program?',
        multiline: true,
      },
      {
        name: 'learnedAboutPathfinder',
        label: 'How did you find out about our program?',
        size: 12,
        type: 'radio',
        options: [
          'Family and/or friends',
          'Teacher/counselor',
          'Our poster',
          'Probation officer',
          'Social worker',
          'Government agency',
          'Employment office',
          'Case manager',
          'Website',
          'Community agency',
          'Drug counselor',
          'Other',
        ],
      },
      {
        name: 'learnedAboutPathfinderOther',
        type: 'text',
        description:
          'If you answered "other" to "How did you find out about our program?", please specify:',
        label: 'If other, please specify',
        size: 12,
        multiline: true,
        dependsOnOtherField: {
          name: 'learnedAboutPathfinder',
          list: false,
          value: 'Other',
        },
      },
      {
        name: 'hasEmploymentProgramTraining',
        label: 'Have you ever attended a job club or paid employment training program?',
        type: 'radio',
        size: 8,
        options: ['Yes', 'No'],
      },
      {
        name: 'employmentProgramComplete',
        label: 'Did you complete the job club or paid employment program?',
        type: 'radio',
        size: 4,
        options: ['Yes', 'No'],
        dependsOnOtherField: {
          name: 'hasEmploymentProgramTraining',
          list: false,
          value: 'Yes',
        },
      },
      {
        name: 'employmentProgramInfo',
        type: 'text',
        size: 12,
        description:
          'If you did attend a job club or paid employment program, what name, month, year, of the program and where was it?',
        multiline: true,
        dependsOnOtherField: {
          name: 'hasEmploymentProgramTraining',
          list: false,
          value: 'Yes',
        },
      },
    ],
  },
  {
    stepName: 'Employment Equity',
    fields: [
      {
        name: 'gender',
        label: 'Gender',
        type: 'radio',
        required: true,
        size: 12,
        options: ['Male', 'Female', 'Other', 'Decline to answer'],
      },
      {
        name: 'memberOfAVisibleMinority',
        label: 'Member of a visible minority',
        type: 'radio',
        required: true,
        size: 6,
        options: ['Yes', 'No', 'Decline to answer'],
      },
      {
        name: 'personWithDisability',
        label: 'Person with a disability',
        type: 'radio',
        required: true,
        size: 6,
        options: ['Yes', 'No', 'Decline to answer'],
      },
      {
        name: 'indigenousGroup',
        label: 'Indigenous group',
        type: 'radio',
        required: true,
        size: 12,
        options: [
          'Registered on-reserve',
          'Registered off-reserve',
          'Non status',
          'Métis',
          'Inuit',
          'N/A',
          'Decline to answer',
        ],
      },
      {
        name: 'newImmigrant',
        label: 'New immigrant',
        type: 'radio',
        required: true,
        size: 6,
        options: ['Yes', 'No', 'Decline to answer'],
      },
      {
        name: 'levelOfEducation',
        label: 'Level of education (select the highest level of education you have completed)',
        type: 'radio',
        required: true,
        size: 12,
        options: [
          'Elementary',
          'Secondary incomplete',
          'Secondary completed',
          'Post-secondary incomplete (college, CEGEP, etc.)',
          'Post-secondary completed',
          'University incomplete (1 or more years)',
          'University degree',
          'Decline to answer',
        ],
      },
    ],
  },
  {
    stepName: 'Medical Information',
    fields: [
      {
        name: 'bcCareCardNumber',
        label: 'BC care card number',
        type: 'text',
        size: 4,
        mask: true,
        required: true,
      },
      {
        name: 'doctorName',
        label: "Doctor's name",
        type: 'text',
        size: 4,
      },
      {
        name: 'doctorPhone',
        label: "Doctor's phone number",
        type: 'text',
        size: 4,
        mask: true,
      },
      {
        name: 'hasMentalHealthIssues',
        type: 'radio',
        label: 'Do you have any mental health issues? (e.g., anxiety, depression, mood disorder, schizophrenia, etc.)',
        required: true,
        size: 12,
        options: ['Yes', 'No', 'Decline to answer'],
      },
      {
        name: 'mentalHealthIssues',
        type: 'text',
        description:
          'If you answered "yes" to "Do you have any mental health issues", please specify what issues and any medications you take:',
        label: 'If yes, please specify',
        multiline: true,
        size: 12,
        dependsOnOtherField: {
          name: 'hasMentalHealthIssues',
          list: false,
          value: 'Yes',
        },
      },
      {
        name: 'medicalConditions',
        type: 'text',
        size: 12,
        description:
          'Do you have any other medical conditions or take any medications that we should know about? Please list condition and/or medication and dosages. (e.g., asthma, diabetes, etc.)',
      },
      {
        name: 'allergies',
        type: 'text',
        size: 12,
        description:
          'Do you have any allergies? (e.g., foods, medication, perfume, paint, pollen, grass, dust, etc.)',
      },
      {
        name: 'fears',
        type: 'text',
        size: 12,
        description:
          'Do you have any fears that our program coordinator and facilitator should be aware of? (e.g., water, bees, heights, planes, etc.)',
      },
    ],
  },
  {
    stepName: 'Financial Information',
    fields: [
      {
        name: 'sin',
        type: 'text',
        label: 'Social insurance number',
        size: 6,
        required: true,
        mask: true,
      },
      {
        name: 'numDependants',
        label: 'Number of dependants',
        type: 'number',
        size: 6,
      },
      {
        name: 'housingSituation',
        type: 'radio',
        size: 12,
        required: true,
        label:
          'What is your current housing situation?',
        options: [
          'Renting',
          'Living with family',
          'Couch-surfing',
          'Homeless',
          'Living in foster care',
          'Other',
        ],
      },
      {
        name: 'housingSituationOther',
        type: 'text',
        description:
          'If you answered "other" to "What is your current housing situation?", please specify:',
        label: 'If other, please specify',
        size: 6,
        multiline: true,
        dependsOnOtherField: {
          name: 'housingSituation',
          list: false,
          value: 'Other',
        },
      },
      {
        name: 'rent',
        type: 'number',
        size: 6,
        description:
          'How much do you pay for rent per month? (Please put $0 if you are not required to pay rent at your place of residence or where you are staying)',

        adornment: '$',
      },
      {
        name: 'hasBankAccount',
        label: 'Do you have a bank account?',
        type: 'radio',
        size: 4,
        options: ['Yes', 'No'],
      },
      {
        name: 'bankAccountType',
        label: 'If yes, is your bank account a chequing or savings account or do you have both?',
        type: 'radio',
        size: 8,
        dependsOnOtherField: {
          name: 'hasBankAccount',
          list: false,
          value: 'Yes',
        },
        options: ['Chequing', 'Savings', 'Both'],
      },
      {
        name: 'formOfIncome',
        label: 'What is your current form of income?',
        type: 'radio',
        size: 12,
        options: [
          'None',
          'Employment insurance',
          'Social assistance',
          'Part-time job',
          'Full-time job',
          'Family support',
          'Band funding',
          'Other',
        ],
      },
      {
        name: 'formOfIncomeOther',
        type: 'text',
        description:
          'If you answered "other" to "What is your current form of income?", please specify:',
        label: 'If other, please specify',
        size: 12,
        multiline: true,
        dependsOnOtherField: {
          name: 'formOfIncome',
          list: false,
          value: 'Other',
        },
      },
    ],
  },
  {
    stepName: 'Current Situation',
    fields: [
      {
        name: 'timeOutOfWork',
        label: 'How long have you been out of work since your last job or since you left school?',
        type: 'radio',
        size: 12,
        options: [
          'Less than 6 months',
          '6 months to 1 year',
          '1 year to 3 years',
          '3 years to 5 years',
          '5 years or more',
        ],
      },
      {
        name: 'reasonsForUnemployment',
        label: 'What is the main reason you are unemployed? (check all that apply to you)',
        type: 'checklist',
        size: 12,
        options: [
          'I have just completed school or another training program',
          'I do not know how to do a good job search on my own',
          'I do not know what I want to do',
          'I have no experience',
          'I have a physical and/or mental health problem',
          'I had no interest in working',
          'I have a drug and/or alcohol addiction problem',
          'I do not have appropriate interview attire or my physical appearance needs improvement',
          'Other',
        ],
      },
      {
        name: 'reasonsForUnemploymentOther',
        type: 'text',
        size: 12,
        label: 'If other, please specify',
        description: 'If there are other reasons you are unemployed, please specify:',
        multiline: true,
        dependsOnOtherField: {
          name: 'reasonsForUnemployment',
          list: true,
          value: 'Other',
        },
      },
      {
        name: 'numberOfJobInterviews',
        type: 'number',
        size: 12,
        description: 'How many job interviews have you been to in the last 6 months?',
      },
      {
        name: 'lawTrouble',
        type: 'text',
        size: 12,
        description: 'Have you ever been in trouble with the law or on parole? Please explain.',

        multiline: true,
      },
      {
        name: 'inRehabOrAddictionsServices',
        size: 4,
        label: 'Are you currently in any community rehab programs or addictions support services?',
        type: 'radio',
        options: ['Yes', 'No'],
      },
      {
        name: 'physicalActivities',
        type: 'text',
        size: 12,
        description:
          'Are you physically active? If yes, list the activities you currently do. (e.g., walking, jogging, enrolled in a gym, weight lifting, karate, swimming, etc.)',

        multiline: true,
      },
      {
        name: 'citizenshipStatus',
        label: 'Citizenship status',
        type: 'radio',
        size: 6,
        options: ['Canadian citizen', 'Permanent resident', 'Native Canadian'],
      },
      {
        name: 'isEntitledToWorkInCanada',
        label: 'Are you legally entitled to work in Canada?',
        type: 'radio',
        size: 6,
        options: ['Yes', 'No'],
      },
      {
        name: 'hasHealthConcerns',
        size: 4,
        label:
          'Do you have any health or physical concerns that may affect your ability to participate in our program?',
        type: 'radio',
        options: ['Yes', 'No'],
      },
      {
        name: 'healthConcerns',
        label: 'If you do have health concerns, please specify',
        size: 8,
        type: 'text',
        dependsOnOtherField: {
          name: 'hasHealthConcerns',
          list: false,
          value: 'Yes',
        },
      },
      {
        name: 'formOfTransportation',
        type: 'text',
        size: 12,
        description:
          'What is your current form of transportation? (e.g., bus, walk, drive, bicycle, get a ride, etc.)',

        multiline: true,
      },
      {
        name: 'hasValidDriversLicense',
        label: "Do you have a valid driver's licence?",
        type: 'radio',
        size: 4,
        options: ['Yes', 'No'],
      },
      {
        name: 'driversLicenseType',
        label: "If yes, what type of driver's license is it?",
        type: 'radio',
        size: 4,
        options: ["Learner's", 'New driver', 'Full license'],
        dependsOnOtherField: {
          name: 'hasValidDriversLicense',
          list: false,
          value: 'Yes',
        },
      },
      {
        name: 'hasAccessToVehicle',
        label: 'Do you have access to a vehicle?',
        size: 4,
        type: 'radio',
        options: ['Yes', 'No'],
      },
      {
        name: 'nameAndLocationOfSchool',
        type: 'text',
        size: 12,
        description:
          'Please provide the name of the High School or College you last attended and the city and province it’s located in.',
        multiline: true,
      },
      {
        name: 'hasVolunteered',
        label: 'Have you ever volunteered?',
        type: 'radio',
        size: 4,
        options: ['Yes', 'No'],
      },
      {
        name: 'volunteerInfo',
        type: 'text',
        size: 8,
        description:
          'If you have volunteered, where and why did you volunteer and what did you do for the organization?',
        multiline: true,
        dependsOnOtherField: {
          name: 'hasVolunteered',
          list: false,
          value: 'Yes',
        },
      },
      {
        name: 'sixMonthsHistory',
        type: 'text',
        size: 12,
        description: 'What have you been doing for the last six months?',
        multiline: true,
      },
    ],
  },
  {
    stepName: 'Questions',
    fields: [
      {
        name: 'presentSituationAspects',
        label: 'What aspects of your present situation would you like to change? (check two)',
        type: 'checklist',
        size: 12,
        maxChecked: 2,
        options: [
          'Increase my self confidence',
          'Have more money and/or get out of poverty',
          'Increase my skills for the work force',
          'Control or eliminate my drug/alcohol use',
          'Stop running into trouble with the law',
          'Other',
        ],
      },
      {
        name: 'presentSituationAspectsOther',
        type: 'text',
        size: 12,
        description:
          'If there are other to aspects of your present situation that you would like to change, please specify:',
        label: 'If other, please specify',
        multiline: true,
        dependsOnOtherField: {
          name: 'presentSituationAspects',
          list: true,
          value: 'Other',
        },
      },
      {
        name: 'urgentNeeds',
        label: 'What are your two most urgent needs? (check two)',
        type: 'checklist',
        maxChecked: 2,
        size: 12,
        options: [
          'Basic needs (food, shelter and clothing)',
          'The need to be independent',
          'The need to meet people in the same situation as me',
          'The need for personal growth and self-esteem',
          'The need to be active',
          'Other',
        ],
      },
      {
        name: 'urgentNeedsOther',
        type: 'text',
        size: 12,
        description: 'If you have other urgent needs, please specify:',
        label: 'If other, please specify',
        multiline: true,
        dependsOnOtherField: {
          name: 'urgentNeeds',
          list: true,
          value: 'Other',
        },
      },
      {
        name: 'admiresMost',
        type: 'text',
        size: 12,
        description: 'Who do you admire most? Why?',
        multiline: true,
      },
      {
        name: 'hobbies',
        type: 'text',
        size: 12,
        description: 'What are your hobbies? (e.g., singing, painting, beading, dancing, etc.)',
        multiline: true,
      },
      {
        name: 'personality',
        label: 'Do you consider yourself to be:',
        size: 12,
        type: 'radio',
        options: ['Shy/introverted', 'Sociable', 'Extroverted', 'Quiet/reserved'],
      },
      {
        name: 'hasSiblings',
        label: 'Do you have any brothers or sisters?',
        type: 'radio',
        size: 4,
        options: ['Yes', 'No'],
      },
      {
        name: 'siblings',
        type: 'text',
        size: 8,
        description: 'If you have brothers or sisters, who do you like the most and why?',
        multiline: true,
        dependsOnOtherField: {
          name: 'hasSiblings',
          list: false,
          value: 'Yes',
        },
      },
      {
        name: 'hasChildren',
        label: 'Do you have any children?',
        size: 4,
        type: 'radio',
        options: ['Yes', 'No'],
      },
      {
        name: 'children',
        type: 'text',
        size: 8,
        description: 'If you have children, how many and what are their names?',
        multiline: true,
        dependsOnOtherField: {
          name: 'hasChildren',
          list: false,
          value: 'Yes',
        },
      },
      {
        name: 'hasTravelledOutsideBC',
        label: 'Have you ever travelled outside British Columbia?',
        type: 'radio',
        size: 4,
        options: ['Yes', 'No'],
      },
      {
        name: 'hasResume',
        label: 'Do you have a current resume and cover page?',
        type: 'radio',
        size: 4,
        options: ['Yes', 'No'],
      },
      {
        name: 'employmentGoals',
        type: 'text',
        size: 12,
        description: 'What are your employment goals one year from now?',
        multiline: true,
      },
    ],
  },
];

export const noteField = {
  name: 'notes',
  label: 'Enter a note',
  type: 'notes',
  size: 12
}

export const noteStep = {
  stepName: 'Notes',
  fields: [
    noteField
  ]
}

export const participantDetailSteps = [
  ...formSteps,
  noteStep
]

export const initialValues = formSteps.reduce((values, step) => {
  const fields = step.fields;
  fields.forEach((field) => {
    values[field.name] = field.type === 'checklist' ? [] : '';
  });
  return values;
}, {});

export const requiredFields = formSteps.reduce((reqs, step) => {
  const fields = step.fields;
  let stepReqs = [];
  fields.forEach((field) => {
    if (field.required) {
      stepReqs.push(field.name);
    }
  });
  reqs.push(stepReqs);
  return reqs;
}, []);

export const stepNames = participantDetailSteps.map((step) => step.stepName);

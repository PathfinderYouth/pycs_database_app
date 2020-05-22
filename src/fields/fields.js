/**
 * FormStep:
 * Array of form step objects used in the intake form and the participant detail views
 * stepName: string - title of the form step
 * fields: array - list of field objects
 *
 * Field:
 * name: string - key identifier
 * prettyName: string - display name
 * type: string - field type - text | select | radio | checklist | email | date | number | notes | history
 * label?: string - field label
 * description: string - field description
 * size: int - grid size for the intake form
 * detailSize: int - grid size for the participant detail view (if different than the size prop)
 * required: boolean - required prop for input fields
 * options: list - options for radio groups, checklists, and selects
 * masks: boolean - whether to apply a NumberMask or not
 * multiline: boolean - multiline prop for input fields
 * dependsOnOtherField: object - name, value, and type of the field this field depends on
 * maxChecked: int - maximum number of checked items allowed in a checklist
 *
 */
export const formSteps = [
  {
    stepName: 'Basic Information',
    fields: [
      {
        name: 'nameGiven',
        prettyName: 'Given name(s)',
        label: 'Given name(s)',
        type: 'text',
        size: 6,
        detailSize: 4,
        required: true,
      },
      {
        name: 'nameLast',
        prettyName: 'Last name',
        label: 'Last name',
        type: 'text',
        size: 6,
        detailSize: 4,
        required: true,
      },
      {
        name: 'confirmationNumber',
        prettyName: 'Confirmation number',
        label: 'confirmationNumber',
        type: 'text',
        size: 4,
        required: true,
      },
      {
        name: 'addressStreet',
        prettyName: 'Street address',
        label: 'Street address',
        type: 'text',
        size: 8,
      },
      {
        name: 'addressCity',
        prettyName: 'City',
        label: 'City',
        type: 'text',
      },
      {
        name: 'addressProvince',
        prettyName: 'Province',
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
        prettyName: 'Postal code',
        label: 'Postal code',
        size: 4,
        type: 'text',
      },
      {
        name: 'addressTimeLivedAt',
        prettyName: 'Time lived at address',
        label: 'Time lived here',
        size: 4,
        type: 'text',
      },
      {
        name: 'phoneHome',
        prettyName: 'Home phone',
        label: 'Home phone',
        type: 'text',
        mask: true,
        size: 4,
        required: true,
      },
      {
        name: 'phoneCell',
        prettyName: 'Cell phone',
        label: 'Cell phone',
        type: 'text',
        size: 4,
        mask: true,
        required: true,
      },
      {
        name: 'phoneHomeOrCell',
        prettyName: 'Best number to call',
        label: 'Best number to call:',
        type: 'radio',
        size: 4,
        options: ['Home', 'Cell'],
      },
      {
        name: 'email',
        prettyName: 'Email',
        label: 'Email address',
        type: 'email',
        size: 6,
        required: true,
      },
      {
        name: 'birthDate',
        prettyName: 'Birth date',
        label: 'Date of Birth',
        type: 'date',
        size: 6,
        required: true,
      },
      {
        name: 'emergencyContact1Name',
        prettyName: 'Emergency contact 1 - name',
        description: 'Emergency contact 1',
        label: 'Emergency contact name',
        type: 'text',
        size: 12,
        detailSize: 6,
      },
      {
        name: 'emergencyContact1Relationship',
        prettyName: 'Emergency contact 1 - relationship',
        label: 'Relationship to you',
        type: 'text',
        size: 12,
        detailSize: 6,
      },
      {
        name: 'emergencyContact1PhoneHome',
        prettyName: 'Emergency contact 1 - home phone',
        label: 'Home phone',
        type: 'text',
        size: 4,
        mask: true,
      },
      {
        name: 'emergencyContact1PhoneWork',
        prettyName: 'Emergency contact 1 - work phone',
        label: 'Work phone',
        type: 'text',
        size: 4,
        mask: true,
      },
      {
        name: 'emergencyContact1PhoneCell',
        prettyName: 'Emergency contact 1 - cell phone',
        label: 'Cell phone',
        type: 'text',
        size: 4,
        mask: true,
      },
      {
        name: 'emergencyContact2Name',
        description: 'Emergency contact 2',
        prettyName: 'Emergency contact 2 - name',
        label: 'Emergency contact name',
        type: 'text',
        size: 12,
        detailSize: 6,
      },
      {
        name: 'emergencyContact2Relationship',
        prettyName: 'Emergency contact 2 - relationship',
        label: 'Relationship to you',
        type: 'text',
        size: 12,
        detailSize: 6,
      },
      {
        name: 'emergencyContact2PhoneHome',
        prettyName: 'Emergency contact 2 - home phone',
        label: 'Home phone',
        type: 'text',
        size: 4,
        mask: true,
      },
      {
        name: 'emergencyContact2PhoneWork',
        prettyName: 'Emergency contact 2 - work phone',
        label: 'Work phone',
        type: 'text',
        size: 4,
        mask: true,
      },
      {
        name: 'emergencyContact2PhoneCell',
        prettyName: 'Emergency contact 2 - cell phone',
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
        prettyName: 'Program applied for',
        type: 'radio',
        required: true,
        size: 12,
        options: ['New Employment Beginnings', 'Bean Around Books - Employment Experience'],
      },
      {
        name: 'hopeToGainFromProgram',
        prettyName: 'Hope to gain from program',
        type: 'text',
        size: 12,
        description: 'What do you hope to gain from our program when you graduate?',
        multiline: true,
      },
      {
        name: 'whyApplied',
        prettyName: 'Reason applied to Pathfinder',
        type: 'text',
        size: 12,
        description: 'Why have you applied to the Pathfinder Youth Centre Society’s Program? *',
        multiline: true,
        required: true,
      },
      {
        name: 'whyShouldBeAccepted',
        prettyName: 'Reason should be accepted to Pathfinder',
        size: 12,
        type: 'text',
        description: 'Why should you be accepted? *',
        multiline: true,
        required: true,
      },
      {
        name: 'skillsAndExperienceHopes',
        prettyName: 'Hopes to gain through Pathfinder',
        type: 'text',
        size: 12,
        description:
          'What types of skills and experiences do you hope to gain through your participation in this program?',
        multiline: true,
      },
      {
        name: 'learnedAboutPathfinder',
        prettyName: 'Found out about Pathfinder',
        label: 'How did you find out about our program?',
        size: 12,
        detailSize: 6,
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
        prettyName: 'Found out about Pathfinder - other',
        type: 'text',
        description:
          'If you answered "other" to "How did you find out about our program?", please specify:',
        label: 'If other, please specify',
        size: 12,
        detailSize: 6,
        multiline: true,
        dependsOnOtherField: {
          name: 'learnedAboutPathfinder',
          list: false,
          value: 'Other',
        },
      },
      {
        name: 'hasEmploymentProgramTraining',
        prettyName: 'Has employment program training',
        label: 'Have you ever attended a job club or paid employment training program?',
        type: 'radio',
        size: 8,
        detailSize: 6,
        options: ['Yes', 'No'],
      },
      {
        name: 'employmentProgramComplete',
        prettyName: 'Completed employment program training',
        label: 'Did you complete the job club or paid employment program?',
        type: 'radio',
        size: 4,
        detailSize: 6,
        options: ['Yes', 'No'],
        dependsOnOtherField: {
          name: 'hasEmploymentProgramTraining',
          list: false,
          value: 'Yes',
        },
      },
      {
        name: 'employmentProgramInfo',
        prettyName: 'Employment program details',
        type: 'text',
        size: 12,
        description:
          'If you did attend a job club or paid employment program, what was the name, month, year, and location of the program?',
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
        prettyName: 'Gender',
        label: 'Gender',
        type: 'radio',
        required: true,
        size: 12,
        detailSize: 6,
        options: ['Male', 'Female', 'Other', 'Decline to answer'],
      },
      {
        name: 'memberOfAVisibleMinority',
        prettyName: 'Member of a visible minority',
        label: 'Member of a visible minority',
        type: 'radio',
        required: true,
        size: 6,
        options: ['Yes', 'No', 'Decline to answer'],
      },
      {
        name: 'personWithDisability',
        prettyName: 'Person with a disability',
        label: 'Person with a disability',
        type: 'radio',
        required: true,
        size: 6,
        options: ['Yes', 'No', 'Decline to answer'],
      },
      {
        name: 'indigenousGroup',
        prettyName: 'Indigenous group',
        label: 'Indigenous group',
        type: 'radio',
        required: true,
        size: 12,
        detailSize: 6,
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
        prettyName: 'New immigrant',
        label: 'New immigrant',
        type: 'radio',
        required: true,
        size: 6,
        options: ['Yes', 'No', 'Decline to answer'],
      },
      {
        name: 'levelOfEducation',
        prettyName: 'Level of education',
        label: 'Level of education (select the highest level of education you have completed)',
        type: 'radio',
        required: true,
        size: 12,
        detailSize: 6,
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
        prettyName: 'BC care card number',
        label: 'BC care card number',
        type: 'text',
        size: 4,
        mask: true,
        required: true,
      },
      {
        name: 'doctorName',
        prettyName: "Doctor's name",
        label: "Doctor's name",
        type: 'text',
        size: 4,
      },
      {
        name: 'doctorPhone',
        prettyName: "Doctor's phone",
        label: "Doctor's phone number",
        type: 'text',
        size: 4,
        mask: true,
      },
      {
        name: 'hasMentalHealthIssues',
        prettyName: 'Has mental health issues',
        type: 'radio',
        label:
          'Do you have any mental health issues? (e.g., anxiety, depression, mood disorder, schizophrenia, etc.)',
        required: true,
        size: 12,
        detailSize: 4,
        options: ['Yes', 'No', 'Decline to answer'],
      },
      {
        name: 'mentalHealthIssues',
        prettyName: 'Mental health issues details',
        type: 'text',
        description:
          'If you answered "yes" to "Do you have any mental health issues", please specify what issues and any medications you take:',
        label: 'If yes, please specify',
        multiline: true,
        size: 12,
        detailSize: 8,
        dependsOnOtherField: {
          name: 'hasMentalHealthIssues',
          list: false,
          value: 'Yes',
        },
      },
      {
        name: 'medicalConditions',
        prettyName: 'Medical conditions',
        type: 'text',
        size: 12,
        description:
          'Do you have any other medical conditions or take any medications that we should know about? Please list condition and/or medication and dosages. (e.g., asthma, diabetes, etc.)',
      },
      {
        name: 'allergies',
        prettyName: 'Allergies',
        type: 'text',
        size: 12,
        description:
          'Do you have any allergies? (e.g., foods, medication, perfume, paint, pollen, grass, dust, etc.)',
      },
      {
        name: 'fears',
        prettyName: 'Fears',
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
        prettyName: 'SIN',
        type: 'text',
        label: 'Social insurance number',
        size: 6,
        required: true,
        mask: true,
      },
      {
        name: 'numDependants',
        prettyName: 'Number of dependants',
        label: 'Number of dependants',
        type: 'number',
        size: 6,
      },
      {
        name: 'housingSituation',
        prettyName: 'Housing situation',
        type: 'radio',
        size: 12,
        detailSize: 4,
        required: true,
        label: 'What is your current housing situation?',
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
        prettyName: 'Housing situation - other',
        type: 'text',
        description:
          'If you answered "other" to "What is your current housing situation?", please specify:',
        label: 'If other, please specify',
        size: 6,
        detailSize: 8,
        multiline: true,
        dependsOnOtherField: {
          name: 'housingSituation',
          list: false,
          value: 'Other',
        },
      },
      {
        name: 'rent',
        prettyName: 'Rent',
        type: 'number',
        size: 6,
        detailSize: 12,
        description:
          'How much do you pay for rent per month? (Please put $0 if you are not required to pay rent at your place of residence or where you are staying)',
        adornment: '$',
      },
      {
        name: 'hasBankAccount',
        prettyName: 'Has bank account',
        label: 'Do you have a bank account?',
        type: 'radio',
        size: 4,
        detailSize: 4,
        options: ['Yes', 'No'],
      },
      {
        name: 'bankAccountType',
        prettyName: 'Bank account type',
        label: 'If yes, is your bank account a chequing or savings account or do you have both?',
        type: 'radio',
        size: 8,
        detailSize: 8,
        dependsOnOtherField: {
          name: 'hasBankAccount',
          list: false,
          value: 'Yes',
        },
        options: ['Chequing', 'Savings', 'Both'],
      },
      {
        name: 'formOfIncome',
        prettyName: 'Form of income',
        label: 'What is your current form of income?',
        type: 'radio',
        size: 12,
        detailSize: 4,
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
        prettyName: 'Form of income - other',
        type: 'text',
        description:
          'If you answered "other" to "What is your current form of income?", please specify:',
        label: 'If other, please specify',
        size: 12,
        detailSize: 8,
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
        prettyName: 'Time out of work',
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
        prettyName: 'Reasons for unemployment',
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
        prettyName: 'Reasons for unemployment - other',
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
        prettyName: 'Number of job interviews in last 6 months',
        type: 'number',
        size: 12,
        description: 'How many job interviews have you been to in the last 6 months?',
      },
      {
        name: 'lawTrouble',
        prettyName: 'Law trouble',
        type: 'text',
        size: 12,
        description: 'Have you ever been in trouble with the law or on parole? Please explain.',
        multiline: true,
      },
      {
        name: 'inRehabOrAddictionsServices',
        prettyName: 'In rehab/addictions support',
        size: 4,
        label: 'Are you currently in any community rehab programs or addictions support services?',
        type: 'radio',
        options: ['Yes', 'No'],
      },
      {
        name: 'physicalActivities',
        prettyName: 'Physical activity',
        type: 'text',
        size: 12,
        description:
          'Are you physically active? If yes, list the activities you currently do. (e.g., walking, jogging, enrolled in a gym, weight lifting, karate, swimming, etc.)',
        multiline: true,
      },
      {
        name: 'citizenshipStatus',
        prettyName: 'Citizenship status',
        label: 'Citizenship status',
        type: 'radio',
        size: 6,
        options: ['Canadian citizen', 'Permanent resident', 'Native Canadian'],
      },
      {
        name: 'isEntitledToWorkInCanada',
        prettyName: 'Is entitled to work in Canada',
        label: 'Are you legally entitled to work in Canada?',
        type: 'radio',
        size: 6,
        options: ['Yes', 'No'],
      },
      {
        name: 'hasHealthConcerns',
        prettyName: 'Has health concerns',
        size: 4,
        label:
          'Do you have any health or physical concerns that may affect your ability to participate in our program?',
        type: 'radio',
        options: ['Yes', 'No'],
      },
      {
        name: 'healthConcerns',
        prettyName: 'Health concerns details',
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
        prettyName: 'Form of transportation',
        type: 'text',
        size: 12,
        description:
          'What is your current form of transportation? (e.g., bus, walk, drive, bicycle, get a ride, etc.)',
        multiline: true,
      },
      {
        name: 'hasValidDriversLicense',
        prettyName: "Has driver's license",
        label: "Do you have a valid driver's licence?",
        type: 'radio',
        size: 4,
        options: ['Yes', 'No'],
      },
      {
        name: 'driversLicenseType',
        prettyName: "Driver's license type",
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
        prettyName: 'Has access to vehicle',
        label: 'Do you have access to a vehicle?',
        size: 4,
        type: 'radio',
        options: ['Yes', 'No'],
      },
      {
        name: 'nameAndLocationOfSchool',
        prettyName: 'Name and location of school last attended',
        type: 'text',
        size: 12,
        description:
          'Please provide the name of the High School or College you last attended and the city and province it’s located in.',
        multiline: true,
      },
      {
        name: 'hasVolunteered',
        prettyName: 'Has volunteered',
        label: 'Have you ever volunteered?',
        type: 'radio',
        size: 4,
        options: ['Yes', 'No'],
      },
      {
        name: 'volunteerInfo',
        prettyName: 'Volunteering details',
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
        prettyName: 'Last 6 months history',
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
        prettyName: 'Present situation aspects to change',
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
        prettyName: 'Present situation aspects to change - other',
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
        prettyName: 'Urgent needs',
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
        prettyName: 'Urgent needs - other',
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
        prettyName: 'Admires most',
        type: 'text',
        size: 12,
        description: 'Who do you admire most? Why?',
        multiline: true,
      },
      {
        name: 'hobbies',
        prettyName: 'Hobbies',
        type: 'text',
        size: 12,
        description: 'What are your hobbies? (e.g., singing, painting, beading, dancing, etc.)',
        multiline: true,
      },
      {
        name: 'personality',
        prettyName: 'Personality',
        label: 'Do you consider yourself to be:',
        size: 12,
        type: 'radio',
        options: ['Shy/introverted', 'Sociable', 'Extroverted', 'Quiet/reserved'],
      },
      {
        name: 'hasSiblings',
        prettyName: 'Has siblings',
        label: 'Do you have any brothers or sisters?',
        type: 'radio',
        size: 4,
        detailSize: 6,
        options: ['Yes', 'No'],
      },
      {
        name: 'siblings',
        prettyName: 'Siblings details',
        type: 'text',
        size: 8,
        detailSize: 6,
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
        prettyName: 'Has children',
        label: 'Do you have any children?',
        size: 4,
        detailSize: 6,
        type: 'radio',
        options: ['Yes', 'No'],
      },
      {
        name: 'children',
        prettyName: 'Children details',
        type: 'text',
        size: 8,
        detailSize: 6,
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
        prettyName: 'Has travelled outside BC',
        label: 'Have you ever travelled outside British Columbia?',
        type: 'radio',
        size: 4,
        detailSize: 6,
        options: ['Yes', 'No'],
      },
      {
        name: 'hasResume',
        prettyName: 'Has resume',
        label: 'Do you have a current resume and cover page?',
        type: 'radio',
        size: 4,
        detailSize: 6,
        options: ['Yes', 'No'],
      },
      {
        name: 'employmentGoals',
        prettyName: 'Employment goals',
        type: 'text',
        size: 12,
        description: 'What are your employment goals one year from now?',
        multiline: true,
      },
    ],
  },
];

// Special field type for notes
export const noteField = {
  name: 'notes',
  label: 'Enter a note',
  type: 'notes',
  size: 12,
};

// Note step for the participant detail view
export const noteStep = {
  stepName: 'Notes',
  fields: [noteField],
};

// Special field type for action plan
export const actionPlanField = {
  name: 'actionPlan',
  label: 'Action plan',
  description: 'Participant action plan',
  type: 'actionPlan',
  size: 12,
};

// Action plan step for the participant detail view
export const actionPlanStep = {
  stepName: 'Action Plan',
  fields: [actionPlanField],
};

// Special field type for history
export const historyField = {
  name: 'history',
  label: 'History',
  description: 'Participant record history',
  type: 'history',
  size: 12,
};

// History step for the participant detail view
export const historyStep = {
  stepName: 'History',
  fields: [historyField],
};

// Participant detail steps containing all of the form steps from the intake form as well as the noteStep and the historyStep
export const participantDetailSteps = [...formSteps, noteStep, actionPlanStep, historyStep];

// Initial values of the intake form extracted from formSteps used to initialize the Formik form
export const initialValues = formSteps.reduce((values, step) => {
  const fields = step.fields;
  fields.forEach((field) => {
    values[field.name] = field.type === 'checklist' ? [] : '';
  });
  return values;
}, {});

// lists of step names
export const stepNames = formSteps.map((step) => step.stepName);
export const participantDetailStepNames = participantDetailSteps.map((step) => step.stepName);

// Key value pairs of fieldNames and prettyNames
export const fieldNames = formSteps.reduce((values, step) => {
  const fields = step.fields;
  fields.forEach((field) => {
    values[field.name] = field.prettyName;
  });
  return values;
}, {});

/**
 * Determines which step a field belongs to using its name and returns the step index
 * @param {string} fieldName
 * @return int step index
 */
export const belongsToStepIndex = (fieldName) => {
  const step = formSteps.find((step) => step.fields.find((field) => field.name === fieldName));
  return formSteps.indexOf(step);
};

/**
 * Determines the index of a step to using its name
 * @param {string} stepName
 * @return int step index
 */
export const getStepIndexFromStepName = (stepName) => {
  const step = participantDetailSteps.find((step) => step.stepName === stepName);
  return participantDetailSteps.indexOf(step);
};

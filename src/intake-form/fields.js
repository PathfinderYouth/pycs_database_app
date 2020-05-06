export const intakeFormInitialValues = {
  // start page
  nameGiven: '',
  nameLast: '',

  // basic information
  programAppliedFor: '', // 'new employment beginnings' or 'bean around books'
  addressStreet: '',
  addressCity: '',
  addressProvince: '',
  addressPostalCode: '',
  timeLivedAtAddress: '',
  phoneHome: '',
  phoneCell: '',
  bestNumberToCall: '', // 'home' or 'cell'
  email: '',
  birthDate: '',
  emergencyContacts: {
    eContact1: {
      name: '',
      relationship: '',
      phoneHome: '',
      phoneWork: '',
      phoneCell: '',
    },
    eContact2: {
      name: '',
      relationship: '',
      phoneHome: '',
      phoneWork: '',
      phoneCell: '',
    },
  },

  // medical information
  doctorName: '',
  doctorPhone: '',
  bcCareCardNumber: '',
  numDependants: '',
  medicalConditions: '',
  allergies: '',
  fears: '',
  addictions: '',
  lawTrouble: '',

  // applicant's current status
  formOfTransportation: '',
  housingSituation: '',
  rent: '',
  physicalActivities: '',
  hasBankAccount: '',
  bankAccountType: '', // chequing, savings, both
  sin: '',
  citizenshipStatus: '', // canadian citizen, permanent resident, or native canadian
  isEntitledToWork: '',
  hasHealthConcerns: '',
  healthConcerns: '',
  hasValidDriversLicense: '',
  driversLicenseType: '', // learner's, new driver, or full license
  hasAccessToVehicle: '',
  learnedAboutPathfinder: '',
  /* Family and/or friends, Teacher/Counselor, Our Poster,
  Probation Officer, Social Worker, Government Agency,
  Employment Office, Case Manager, Website, Community Agency,
  Drug Counselor, or Other */
  learnedAboutPathfinderOther: '',
  formOfIncome: '',
  /* None, Employment Insurance, Social Assistance,
  Part-time Job, Full-time job, Family Support,
  Band Funding, or Other, */
  formOfIncomeOther: '',
  levelOfEducation: '',
  /* Less than Grade 9, Grade 9, Grade 10, Grade 11, some grade 12,
  Grade 12 Diploma, Trade Certificate/Diploma,
  Some university/College, University Degree/ College Diploma */
  nameAndLocationOfSchool: '',
  hasEmploymentProgramTraining: '',
  employmentProgramInfo: '',
  employmentProgramComplete: '',
  sixMonthsHistory: '',
  presentSituationAspects: [],
  /* Max two of: 
    Increase my self confidence,
    Have more money and/or get out of poverty,
    Increase my skills for the work force,
    Control or eliminate my drug/alcohol use,
    Stop running into trouble with the law,
    Other
  */
  presentSituationOther: '',
  urgentNeeds: [],
  /* Max two of: 
    Basic needs (food, shelter and clothing),
    The need to be independent,
    The need to meet people in the same situation as me,
    The need for personal growth and self-esteem,
    The need to be active
    Other
  */
  urgentNeedsOther: '',
  timeOutOfWork: '',
  /* Less than 6 months, 6 months to 1 year, 1year to 3 years,
  3 years to 5 years, 5 years or more */
  reasonsForUnemployment: [],
  /* Any of:
    I have just completed school or another training program
    I do not know how to do a good job search on my own
    I do not know what I want to do
    I have no experience
    I have a physical and /or mental health problem
    I have a drug and/or alcohol addiction problem
    I had no interest in working
    I do not have appropriate interview attire or my physical appearance needs improvement
    Other
  */
  reasonsForUnemploymentOther: '',
  hopeToGainFromProgram: '',
  admiresMost: '',
  hobbies: '',
  personality: '', // Shy/Introvert, Sociable, Extroverted, or Quiet/Reserved
  hasSiblings: '',
  siblings: '',
  hasChildren: '',
  children: '',
  numberOfJobInterviews: '',
  hasVolunteered: '',
  volunteerInfo: '',
  hasTravelledOutsideBC: '',
  inRehabOrAddictionsServices: '',
  hasResume: '',
  whyApplied: '',
  whyShouldBeAccepted: '',
  employmentGoals: '',
  skillsAndExperienceHopes: '',
};

export const provinces = [
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
];

export const requiredFields = [
  [
    'nameGiven', 'nameLast'
  ],
  [
    'programAppliedFor', 'birthDate', 'contactMethod', 'phoneHome', 'phoneCell', 'email'
  ],
  [
    'bcCareCardNumber'
  ],
  [
    'sin'
  ],
  [
    'whyApplied', 'whyShouldBeAccepted'
  ]
]

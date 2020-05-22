import moment from 'moment';
import csvStringify from 'csv-stringify';
import streamSaver from 'streamsaver';

/**
 * Configuration object for csv-stringify package.
 */
const config = {
  header: true,
  quoted: true,
  quoted_empty: true,
  cast: {
    object: (value) => {
      return JSON.stringify(value)
        .replace(/["[\]{}]/g, '')
        .replace(/[\t\n:]|\\n/g, ' ')
        .replace(/,\b/g, '. ');
    },
  },
  columns: [
    {
      key: 'nameGiven',
      header: 'Given name(s)',
    },
    {
      key: 'nameLast',
      header: 'Last name',
    },
    {
      key: 'confirmationNumber',
      header: 'Confirmation number',
    },
    {
      key: 'addressStreet',
      header: 'Street address',
    },
    {
      key: 'addressCity',
      header: 'City',
    },
    {
      key: 'addressProvince',
      header: 'Province',
    },
    {
      key: 'addressPostalCode',
      header: 'Postal code',
    },
    {
      key: 'addressTimeLivedAt',
      header: 'Time lived at address',
    },
    {
      key: 'phoneHome',
      header: 'Home phone',
    },
    {
      key: 'phoneCell',
      header: 'Cell phone',
    },
    {
      key: 'phoneHomeOrCell',
      header: 'Best number to call',
    },
    {
      key: 'email',
      header: 'Email',
    },
    {
      key: 'birthDate',
      header: 'Birth date',
    },
    {
      key: 'emergencyContact1Name',
      header: 'Emergency contact 1 - name',
    },
    {
      key: 'emergencyContact1Relationship',
      header: 'Emergency contact 1 - relationship',
    },
    {
      key: 'emergencyContact1PhoneHome',
      header: 'Emergency contact 1 - home phone',
    },
    {
      key: 'emergencyContact1PhoneWork',
      header: 'Emergency contact 1 - work phone',
    },
    {
      key: 'emergencyContact1PhoneCell',
      header: 'Emergency contact 1 - cell phone',
    },
    {
      key: 'emergencyContact2Name',
      header: 'Emergency contact 2 - name',
    },
    {
      key: 'emergencyContact2Relationship',
      header: 'Emergency contact 2 - relationship',
    },
    {
      key: 'emergencyContact2PhoneHome',
      header: 'Emergency contact 2 - home phone',
    },
    {
      key: 'emergencyContact2PhoneWork',
      header: 'Emergency contact 2 - work phone',
    },
    {
      key: 'emergencyContact2PhoneCell',
      header: 'Emergency contact 2 - cell phone',
    },
    {
      key: 'programAppliedFor',
      header: 'Program applied for',
    },
    {
      key: 'hopeToGainFromProgram',
      header: 'Hope to gain from program',
    },
    {
      key: 'whyApplied',
      header: 'Reason applied to Pathfinder',
    },
    {
      key: 'whyShouldBeAccepted',
      header: 'Reason should be accepted to Pathfinder',
    },
    {
      key: 'skillsAndExperienceHopes',
      header: 'Hopes to gain through Pathfinder',
    },
    {
      key: 'learnedAboutPathfinder',
      header: 'Found out about Pathfinder',
    },
    {
      key: 'learnedAboutPathfinderOther',
      header: 'Found out about Pathfinder - other',
    },
    {
      key: 'hasEmploymentProgramTraining',
      header: 'Has employment program training',
    },
    {
      key: 'employmentProgramComplete',
      header: 'Completed employment program training',
    },
    {
      key: 'employmentProgramInfo',
      header: 'Employment program details',
    },
    {
      key: 'gender',
      header: 'Gender',
    },
    {
      key: 'memberOfAVisibleMinority',
      header: 'Member of a visible minority',
    },
    {
      key: 'personWithDisability',
      header: 'Person with a disability',
    },
    {
      key: 'indigenousGroup',
      header: 'Indigenous group',
    },
    {
      key: 'newImmigrant',
      header: 'New immigrant',
    },
    {
      key: 'levelOfEducation',
      header: 'Level of education',
    },
    {
      key: 'bcCareCardNumber',
      header: 'BC care card number',
    },
    {
      key: 'doctorName',
      header: "Doctor's name",
    },
    {
      key: 'doctorPhone',
      header: "Doctor's phone",
    },
    {
      key: 'hasMentalHealthIssues',
      header: 'Has mental health issues',
    },
    {
      key: 'mentalHealthIssues',
      header: 'Mental health issues details',
    },
    {
      key: 'medicalConditions',
      header: 'Medical conditions',
    },
    {
      key: 'allergies',
      header: 'Allergies',
    },
    {
      key: 'fears',
      header: 'Fears',
    },
    {
      key: 'sin',
      header: 'SIN',
    },
    {
      key: 'numDependants',
      header: 'Number of dependants',
    },
    {
      key: 'housingSituation',
      header: 'Housing situation',
    },
    {
      key: 'housingSituationOther',
      header: 'Housing situation - other',
    },
    {
      key: 'rent',
      header: 'Rent',
    },
    {
      key: 'hasBankAccount',
      header: 'Has bank account',
    },
    {
      key: 'bankAccountType',
      header: 'Bank account type',
    },
    {
      key: 'formOfIncome',
      header: 'Form of income',
    },
    {
      key: 'formOfIncomeOther',
      header: 'Form of income - other',
    },
    {
      key: 'timeOutOfWork',
      header: 'Time out of work',
    },
    {
      key: 'reasonsForUnemployment',
      header: 'Reasons for unemployment',
    },
    {
      key: 'reasonsForUnemploymentOther',
      header: 'Reasons for unemployment - other',
    },
    {
      key: 'numberOfJobInterviews',
      header: 'Number of job interviews in last 6 months',
    },
    {
      key: 'lawTrouble',
      header: 'Law trouble',
    },
    {
      key: 'inRehabOrAddictionsServices',
      header: 'In rehab/addictions support',
    },
    {
      key: 'physicalActivities',
      header: 'Physical activity',
    },
    {
      key: 'citizenshipStatus',
      header: 'Citizenship status',
    },
    {
      key: 'isEntitledToWorkInCanada',
      header: 'Is entitled to work in Canada',
    },
    {
      key: 'hasHealthConcerns',
      header: 'Has health concerns',
    },
    {
      key: 'healthConcerns',
      header: 'Health concerns details',
    },
    {
      key: 'formOfTransportation',
      header: 'Form of transportation',
    },
    {
      key: 'hasValidDriversLicense',
      header: "Has driver's license",
    },
    {
      key: 'driversLicenseType',
      header: "Driver's license type",
    },
    {
      key: 'hasAccessToVehicle',
      header: 'Has access to vehicle',
    },
    {
      key: 'nameAndLocationOfSchool',
      header: 'Name and location of school last attended',
    },
    {
      key: 'hasVolunteered',
      header: 'Has volunteered',
    },
    {
      key: 'volunteerInfo',
      header: 'Volunteering details',
    },
    {
      key: 'sixMonthsHistory',
      header: 'Last 6 months history',
    },
    {
      key: 'presentSituationAspects',
      header: 'Present situation aspects to change',
    },
    {
      key: 'presentSituationAspectsOther',
      header: 'Present situation aspects to change - other',
    },
    {
      key: 'urgentNeeds',
      header: 'Urgent needs',
    },
    {
      key: 'urgentNeedsOther',
      header: 'Urgent needs - other',
    },
    {
      key: 'admiresMost',
      header: 'Admires most',
    },
    {
      key: 'hobbies',
      header: 'Hobbies',
    },
    {
      key: 'personality',
      header: 'Personality',
    },
    {
      key: 'hasSiblings',
      header: 'Has siblings',
    },
    {
      key: 'siblings',
      header: 'Siblings details',
    },
    {
      key: 'hasChildren',
      header: 'Has children',
    },
    {
      key: 'children',
      header: 'Children details',
    },
    {
      key: 'hasTravelledOutsideBC',
      header: 'Has travelled outside BC',
    },
    {
      key: 'hasResume',
      header: 'Has resume',
    },
    {
      key: 'employmentGoals',
      header: 'Employment goals',
    },
  ],
};

/**
 * This class is used for export participant list into a csv file.
 */
export const exportParticipants = (participants) => {
  const fileName = `Participant_${moment().format(moment.HTML5_FMT.DATE)}.csv`;

  // Get a write stream to the file
  const fileStream = streamSaver.createWriteStream(fileName);
  const writer = fileStream.getWriter();

  // Create a stream for parsing participant record into a row in csv file
  const stringifier = csvStringify(config);

  stringifier.on('readable', async function () {
    // Write each row into csv file
    let row = stringifier.read();
    return !!row ? await writer.write(row) : writer.close();
  });

  for (const participant of participants) {
    // Parse each participant into a row in csv file
    stringifier.write(participant);
  }

  stringifier.end();
};

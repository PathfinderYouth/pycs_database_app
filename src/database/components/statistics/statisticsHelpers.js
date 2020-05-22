import moment from 'moment';
import service from '../../../facade/service';

const db = service.getDatabase();

export const totalCounts = [
  { id: 'total', label: 'Total Participants', count: 0 },
  { id: 'mtd', label: 'Month to Date', count: 0 },
  { id: 'ytd', label: 'Year to Date', count: 0 },
];

export const statisticsGroups = [
  {
    id: 'gender',
    label: 'Gender',
    subcategories: [
      {
        id: 'male',
        label: 'Male',
        dbLabel: 'Male',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'female',
        label: 'Female',
        dbLabel: 'Female',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'other',
        label: 'Other',
        dbLabel: 'Other',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
    ],
  },
  {
    id: 'housingSituation',
    label: 'Homelessness',
    subcategories: [
      {
        id: 'homeless',
        label: 'Homeless',
        dbLabel: 'Homeless',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'couchSurfing',
        label: 'Couch-surfing',
        dbLabel: 'Couch-surfing',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
    ],
  },
  {
    id: 'hasMentalHealthIssues',
    label: 'Mental Health',
    subcategories: [
      {
        id: 'hasMentalHealthIssues',
        label: 'Mental Health Issues',
        dbLabel: 'Yes',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
    ],
  },
  {
    id: 'personWithDisability',
    label: 'Disability',
    subcategories: [
      {
        id: 'personWithDisability',
        label: 'Disability',
        dbLabel: 'Yes',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
    ],
  },
  {
    id: 'memberOfVisibleMinority',
    label: 'Visible Minority',
    subcategories: [
      {
        id: 'memberOfVisibleMinority',
        label: 'Visible Minority',
        dbLabel: 'Yes',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
    ],
  },
  {
    id: 'indigenousGroup',
    label: 'Indigenous Group',
    subcategories: [
      {
        id: 'onReserve',
        label: 'Registered on-reserve',
        dbLabel: 'Registered on-reserve',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'offReserve',
        label: 'Registered off-reserve',
        dbLabel: 'Registered off-reserve',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'nonStatus',
        label: 'Non status',
        dbLabel: 'Non status',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'metis',
        label: 'Métis',
        dbLabel: 'Métis',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'inuit',
        label: 'Inuit',
        dbLabel: 'Inuit',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
    ],
  },
  {
    id: 'newImmigrant',
    label: 'New Immigrant',
    subcategories: [
      {
        id: 'newImmigrant',
        label: 'New Immigrant',
        dbLabel: 'Yes',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
    ],
  },
  {
    id: 'levelOfEducation',
    label: 'Level of Education',
    subcategories: [
      {
        id: 'elementary',
        label: 'Elementary',
        dbLabel: 'Elementary',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'secondaryIncomplete',
        label: 'Secondary incomplete',
        dbLabel: 'Secondary incomplete',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'secondaryComplete',
        label: 'Secondary completed',
        dbLabel: 'Secondary completed',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'psIncomplete',
        label: 'Post-secondary incomplete',
        dbLabel: 'Post-secondary incomplete (college, CEGEP, etc.)',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'psComplete',
        label: 'Post-secondary completed',
        dbLabel: 'Post-secondary completed',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'universityIncomplete',
        label: 'University incomplete',
        dbLabel: 'University incomplete (1 or more years)',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'universityDegree',
        label: 'University degree',
        dbLabel: 'University degree',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
    ],
  },
  {
    id: 'learnedAboutPathfinder',
    label: 'Referral Source',
    subcategories: [
      {
        id: 'familyFriends',
        label: 'Family and/or friends',
        dbLabel: 'Family and/or friends',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'teacherCounselor',
        label: 'Teacher/counselor',
        dbLabel: 'Teacher/counselor',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'poster',
        label: 'Our poster',
        dbLabel: 'Our poster',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'probationOfficer',
        label: 'Probation officer',
        dbLabel: 'Probation officer',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'socialWorker',
        label: 'Social worker',
        dbLabel: 'Social worker',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'governmentAgency',
        label: 'Government agency',
        dbLabel: 'Government agency',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'employmentOffice',
        label: 'Employment office',
        dbLabel: 'Employment office',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'caseManager',
        label: 'Case manager',
        dbLabel: 'Case manager',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'website',
        label: 'Website',
        dbLabel: 'Website',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'communityAgency',
        label: 'Community agency',
        dbLabel: 'Community agency',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'drugCounselor',
        label: 'Drug counselor',
        dbLabel: 'Drug counselor',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
      {
        id: 'other',
        label: 'Other',
        dbLabel: 'Other',
        counts: { total: 0, mtd: 0, ytd: 0 },
      },
    ],
  },
];

/**
 * Resets statistics counts and gets data from the database
 * @param callback
 */
export const updateStatistics = (callback) => {
  // Reset counts
  totalCounts.forEach((item) => (item.count = 0));
  statisticsGroups.forEach((group) => {
    group.subcategories.forEach((sub) => {
      Object.keys(sub.counts).forEach((key) => {
        sub.counts[key] = 0;
      });
    });
  });
  db.getAllPermanentParticipants((participantsList) => {
    calculateStats(participantsList, callback);
  });
};

/**
 * Writes updated statistics to the database
 * @param callback
 */
const writeStats = (participantsList, callback) => {
  db.addStatsCounts(
    totalCounts,
    statisticsGroups,
    () => {
      callback(participantsList);
    },
    () => {},
  );
};

/**
 * Counts the number of participants that apply for each of the
 * demographics we do statistics on
 * @param participantsList
 * @param callback
 */
const calculateStats = (participantsList, callback) => {
  const monthStart = moment().startOf('month');
  const yearStart = moment().startOf('year');

  participantsList.forEach((participant) => {
    let createdMTD = false;
    let createdYTD = false;

    if (participant.hasOwnProperty('createdAt')) {
      const createdDate = moment(participant.createdAt);
      totalCounts.forEach((value) => {
        if (value.id === 'total') {
          value.count++;
        }
        if (createdDate >= monthStart && value.id === 'mtd') {
          createdMTD = true;
          value.count++;
        }
        if (createdDate >= yearStart && value.id === 'ytd') {
          createdYTD = true;
          value.count++;
        }
      });
    }

    const incrementGroup = (group) => {
      if (createdMTD) group.counts.mtd++;
      if (createdYTD) group.counts.ytd++;
      group.counts.total++;
    };

    statisticsGroups.forEach((group) => {
      if (participant.hasOwnProperty(group.id)) {
        group.subcategories.forEach((sub) => {
          if (participant[group.id] === sub.dbLabel) {
            incrementGroup(sub);
          }
        });
      }
    });
  });
  writeStats(participantsList, callback);
};

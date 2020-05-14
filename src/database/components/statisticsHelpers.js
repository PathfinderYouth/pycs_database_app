import participantStore from '../../injectables/ParticipantStore';

export const totalCounts = {
  id: 'total',
  label: 'All Participants',
  counts: { total: 0, mtd: 0, ytd: 0 },
};

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
    id: 'livingSituation',
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
        id: 'personWithDisablity',
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

export const updateStatistics = () => {
  participantStore.getAllParticipants((participantsList) => {
    return calculateStats(participantsList);
  });
};

const calculateStats = (participantsList) => {
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);
  const yearStart = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);

  participantsList.forEach((participant) => {
    let createdMTD = false;
    let createdYTD = false;

    if (participant.hasOwnProperty('createdAt')) {
      const createdDate = new Date(participant.createdAt.seconds * 1000);
      if (createdDate >= monthStart) {
        createdMTD = true;
        totalCounts.counts.mtd++;
      }
      if (createdDate >= yearStart) {
        createdYTD = true;
        totalCounts.counts.ytd++;
      }
      totalCounts.counts.total++;
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
    //
    //   if (participant.hasOwnProperty('gender')) {
    //     switch (participant.gender) {
    //       case 'Male':
    //         incrementGroup(counts.gender.male);
    //         break;
    //       case 'Female':
    //         incrementGroup(counts.gender.female);
    //         break;
    //       case 'Other':
    //         incrementGroup(counts.gender.other);
    //         break;
    //       default:
    //       //do nothing
    //     }
    //     if (
    //       participant.hasOwnProperty('housingSituation') &&
    //       (participant.housingSituation === 'Couch-surfing' ||
    //         participant.housingSituation === 'Homeless')
    //     ) {
    //       incrementGroup(counts.homelessness);
    //     }
    //     if (
    //       participant.hasOwnProperty('hasMentalHealthIssues') &&
    //       participant.hasMentalHealthIssues === 'Yes'
    //     ) {
    //       incrementGroup(counts.mentalHealth);
    //     }
    //     if (
    //       participant.hasOwnProperty('personWithDisability') &&
    //       participant.personWithDisability === 'Yes'
    //     ) {
    //       incrementGroup(counts.personWithDisability);
    //     }
    //     if (
    //       participant.hasOwnProperty('memberOfVisibleMinority') &&
    //       participant.memberOfVisibleMinority === 'Yes'
    //     ) {
    //       incrementGroup(counts.memberOfVisibleMinority);
    //     }
    //     if (participant.hasOwnProperty('indigenousGroup')) {
    //       switch (participant.indigenousGroup) {
    //         case 'Registered on-reserve':
    //           incrementGroup(counts.indigenousGroup.onReserve);
    //           break;
    //         case 'Registered off-reserve':
    //           incrementGroup(counts.indigenousGroup.offReserve);
    //           break;
    //         case 'Non status':
    //           incrementGroup(counts.indigenousGroup.nonStatus);
    //           break;
    //         case 'Métis':
    //           incrementGroup(counts.indigenousGroup.metis);
    //           break;
    //         case 'Inuit':
    //           incrementGroup(counts.indigenousGroup.inuit);
    //           break;
    //         default:
    //         //do nothing
    //       }
    //     }
    //     if (participant.hasOwnProperty('newImmigrant') && participant.newImmigrant === 'Yes') {
    //       incrementGroup(counts.newImmigrant);
    //     }
    //     if (participant.hasOwnProperty('levelOfEducation')) {
    //       switch (participant.levelOfEducation) {
    //         case 'Elementary':
    //           incrementGroup(counts.levelOfEducation.elementary);
    //           break;
    //         case 'Secondary incomplete':
    //           incrementGroup(counts.levelOfEducation.secondaryIncomplete);
    //           break;
    //         case 'Secondary completed':
    //           incrementGroup(counts.levelOfEducation.secondaryComplete);
    //           break;
    //         case 'Post-secondary incomplete (college, CEGEP, etc.)':
    //           incrementGroup(counts.levelOfEducation.psIncomplete);
    //           break;
    //         case 'Post-secondary completed':
    //           incrementGroup(counts.levelOfEducation.psComplete);
    //           break;
    //         case 'University incomplete (1 or more years)':
    //           incrementGroup(counts.levelOfEducation.universityIncomplete);
    //           break;
    //         case 'University degree':
    //           incrementGroup(counts.levelOfEducation.universityDegree);
    //           break;
    //         default:
    //         //do nothing
    //       }
    //     }
    //     if (participant.hasOwnProperty('learnedAboutPathfinder')) {
    //       switch (participant.learnedAboutPathfinder) {
    //         case 'Family and/or friends':
    //           incrementGroup(counts.learnedAboutPathfinder.familyFriends);
    //           break;
    //         case 'Teacher/counselor':
    //           incrementGroup(counts.learnedAboutPathfinder.teacherCounselor);
    //           break;
    //         case 'Our poster':
    //           incrementGroup(counts.learnedAboutPathfinder.poster);
    //           break;
    //         case 'Probation officer':
    //           incrementGroup(counts.learnedAboutPathfinder.probationOfficer);
    //           break;
    //         case 'Social worker':
    //           incrementGroup(counts.learnedAboutPathfinder.socialWorker);
    //           break;
    //         case 'Government agency':
    //           incrementGroup(counts.learnedAboutPathfinder.governmentAgency);
    //           break;
    //         case 'Employment office':
    //           incrementGroup(counts.learnedAboutPathfinder.employmentOffice);
    //           break;
    //         case 'Case manager':
    //           incrementGroup(counts.learnedAboutPathfinder.caseManager);
    //           break;
    //         case 'Website':
    //           incrementGroup(counts.learnedAboutPathfinder.website);
    //           break;
    //         case 'Community agency':
    //           incrementGroup(counts.learnedAboutPathfinder.communityAgency);
    //           break;
    //         case 'Drug counselor':
    //           incrementGroup(counts.learnedAboutPathfinder.drugCounselor);
    //           break;
    //         case 'Other':
    //           incrementGroup(counts.learnedAboutPathfinder.other);
    //           break;
    //       }
    //     }
    //   }
  });
  console.log(totalCounts);
  console.log(statisticsGroups);
  // return counts;
};

import React from 'react';
import participantStore from '../../injectables/ParticipantStore';

export const percent = (amount, total) => {
  return Math.round(amount / total);
};

export const updateStatistics = () => {
  participantStore.getAllParticipants((participantsList) => {
    return calculateStats(participantsList);
  });
};

const calculateStats = (participantsList) => {
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);
  const yearStart = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);

  let counts = {
    all: { total: participantsList.length, mtd: 0, ytd: 0 },
    gender: {
      male: { total: 0, mtd: 0, ytd: 0 },
      female: { total: 0, mtd: 0, ytd: 0 },
      other: { total: 0, mtd: 0, ytd: 0 },
    },
    homelessness: { total: 0, mtd: 0, ytd: 0 },
    mentalHealth: { total: 0, mtd: 0, ytd: 0 },
    personWithDisability: { total: 0, mtd: 0, ytd: 0 },
    memberOfVisibleMinority: { total: 0, mtd: 0, ytd: 0 },
    indigenousGroup: {
      onReserve: { total: 0, mtd: 0, ytd: 0 },
      offReserve: { total: 0, mtd: 0, ytd: 0 },
      nonStatus: { total: 0, mtd: 0, ytd: 0 },
      metis: { total: 0, mtd: 0, ytd: 0 },
      inuit: { total: 0, mtd: 0, ytd: 0 },
    },
    newImmigrant: { total: 0, mtd: 0, ytd: 0 },
    levelOfEducation: {
      elementary: { total: 0, mtd: 0, ytd: 0 },
      secondaryIncomplete: { total: 0, mtd: 0, ytd: 0 },
      secondaryComplete: { total: 0, mtd: 0, ytd: 0 },
      psIncomplete: { total: 0, mtd: 0, ytd: 0 },
      psComplete: { total: 0, mtd: 0, ytd: 0 },
      universityIncomplete: { total: 0, mtd: 0, ytd: 0 },
      universityDegree: { total: 0, mtd: 0, ytd: 0 },
    },
    learnedAboutPathfinder: {
      familyFriends: { total: 0, mtd: 0, ytd: 0 },
      teacherCounselor: { total: 0, mtd: 0, ytd: 0 },
      poster: { total: 0, mtd: 0, ytd: 0 },
      probationOfficer: { total: 0, mtd: 0, ytd: 0 },
      socialWorker: { total: 0, mtd: 0, ytd: 0 },
      governmentAgency: { total: 0, mtd: 0, ytd: 0 },
      employmentOffice: { total: 0, mtd: 0, ytd: 0 },
      caseManager: { total: 0, mtd: 0, ytd: 0 },
      website: { total: 0, mtd: 0, ytd: 0 },
      communityAgency: { total: 0, mtd: 0, ytd: 0 },
      drugCounselor: { total: 0, mtd: 0, ytd: 0 },
      other: { total: 0, mtd: 0, ytd: 0 },
    },
  };

  participantsList.forEach((participant) => {
    let createdMTD = false;
    let createdYTD = false;

    if (participant.hasOwnProperty('createdAt')) {
      const createdDate = new Date(participant.createdAt.seconds * 1000);
      if (createdDate >= monthStart) {
        createdMTD = true;
        counts.all.mtd++;
      }
      if (createdDate >= yearStart) {
        createdYTD = true;
        counts.all.ytd++;
      }
    }

    const incrementGroup = (group) => {
      if (createdMTD) group.mtd++;
      if (createdYTD) group.ytd++;
      group.total++;
    };

    if (participant.hasOwnProperty('gender')) {
      switch (participant.gender) {
        case 'Male':
          incrementGroup(counts.gender.male);
          break;
        case 'Female':
          incrementGroup(counts.gender.female);
          break;
        case 'Other':
          incrementGroup(counts.gender.other);
          break;
        default:
        //do nothing
      }
      if (
        participant.hasOwnProperty('housingSituation') &&
        (participant.housingSituation === 'Couch-surfing' ||
          participant.housingSituation === 'Homeless')
      ) {
        incrementGroup(counts.homelessness);
      }
      if (
        participant.hasOwnProperty('hasMentalHealthIssues') &&
        participant.hasMentalHealthIssues === 'Yes'
      ) {
        incrementGroup(counts.mentalHealth);
      }
      if (
        participant.hasOwnProperty('personWithDisability') &&
        participant.personWithDisability === 'Yes'
      ) {
        incrementGroup(counts.personWithDisability);
      }
      if (
        participant.hasOwnProperty('memberOfVisibleMinority') &&
        participant.memberOfVisibleMinority === 'Yes'
      ) {
        incrementGroup(counts.memberOfVisibleMinority);
      }
      if (participant.hasOwnProperty('indigenousGroup')) {
        switch (participant.indigenousGroup) {
          case 'Registered on-reserve':
            incrementGroup(counts.indigenousGroup.onReserve);
            break;
          case 'Registered off-reserve':
            incrementGroup(counts.indigenousGroup.offReserve);
            break;
          case 'Non status':
            incrementGroup(counts.indigenousGroup.nonStatus);
            break;
          case 'Métis':
            incrementGroup(counts.indigenousGroup.metis);
            break;
          case 'Inuit':
            incrementGroup(counts.indigenousGroup.inuit);
            break;
          default:
          //do nothing
        }
      }
      if (participant.hasOwnProperty('newImmigrant') && participant.newImmigrant === 'Yes') {
        incrementGroup(counts.newImmigrant);
      }
      if (participant.hasOwnProperty('levelOfEducation')) {
        switch (participant.levelOfEducation) {
          case 'Elementary':
            incrementGroup(counts.levelOfEducation.elementary);
            break;
          case 'Secondary incomplete':
            incrementGroup(counts.levelOfEducation.secondaryIncomplete);
            break;
          case 'Secondary completed':
            incrementGroup(counts.levelOfEducation.secondaryComplete);
            break;
          case 'Post-secondary incomplete (college, CEGEP, etc.)':
            incrementGroup(counts.levelOfEducation.psIncomplete);
            break;
          case 'Post-secondary completed':
            incrementGroup(counts.levelOfEducation.psComplete);
            break;
          case 'University incomplete (1 or more years)':
            incrementGroup(counts.levelOfEducation.universityIncomplete);
            break;
          case 'University degree':
            incrementGroup(counts.levelOfEducation.universityDegree);
            break;
          default:
          //do nothing
        }
      }
      if (participant.hasOwnProperty('learnedAboutPathfinder')) {
        switch (participant.learnedAboutPathfinder) {
          case 'Family and/or friends':
            incrementGroup(counts.learnedAboutPathfinder.familyFriends);
            break;
          case 'Teacher/counselor':
            incrementGroup(counts.learnedAboutPathfinder.teacherCounselor);
            break;
          case 'Our poster':
            incrementGroup(counts.learnedAboutPathfinder.poster);
            break;
          case 'Probation officer':
            incrementGroup(counts.learnedAboutPathfinder.probationOfficer);
            break;
          case 'Social worker':
            incrementGroup(counts.learnedAboutPathfinder.socialWorker);
            break;
          case 'Government agency':
            incrementGroup(counts.learnedAboutPathfinder.governmentAgency);
            break;
          case 'Employment office':
            incrementGroup(counts.learnedAboutPathfinder.employmentOffice);
            break;
          case 'Case manager':
            incrementGroup(counts.learnedAboutPathfinder.caseManager);
            break;
          case 'Website':
            incrementGroup(counts.learnedAboutPathfinder.website);
            break;
          case 'Community agency':
            incrementGroup(counts.learnedAboutPathfinder.communityAgency);
            break;
          case 'Drug counselor':
            incrementGroup(counts.learnedAboutPathfinder.drugCounselor);
            break;
          case 'Other':
            incrementGroup(counts.learnedAboutPathfinder.other);
            break;
        }
      }
    }
  });
  return counts;
};

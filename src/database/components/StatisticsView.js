import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { StatisticsCard } from './StatisticsCard';
import './style/StatisticsView.css';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import { statisticsGroups, updateStatistics } from './statisticsHelpers';
import Button from '@material-ui/core/Button';

const percent = (amount, total) => {
  return Math.round(amount / total);
};

export const StatisticsView = inject('participantStore')(
  observer(() => {
    const [currentGroup, setCurrentGroup] = useState('');

    //TODO replace with get from DB
    let counts = {
      all: { total: 0, mtd: 0, ytd: 0 },
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

    const topRow = [
      {
        cardName: 'totalParticipants',
        contents: [{ label: 'Total Participants', number: counts.all.total }],
      },
      {
        cardName: 'mtdParticipants',
        contents: [{ label: 'Month to Date', number: counts.all.mtd }],
      },
      {
        cardName: 'ytdParticipants',
        contents: [{ label: 'Year to Date', number: counts.all.ytd }],
      },
    ];

    const onDropdownChange = (event) => {
      setCurrentGroup(event.target.value);
    };

    return (
      <Grid className="maxWidth" container spacing={1} alignItems="stretch">
        <Grid item xs={4}>
          <Typography variant="body1" className="sectionHead">
            All Time
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" className="sectionHead">
            New Participants
          </Typography>
        </Grid>
        {topRow.map((card) => (
          <Grid item xs={4} key={card.cardName}>
            <StatisticsCard statsList={card.contents} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <FormControl className="statisticsDropdown">
            <InputLabel>Select demographic</InputLabel>
            <Select defaultValue={currentGroup} onChange={onDropdownChange}>
              {statisticsGroups.map((group) => (
                <MenuItem value={group.id} key={group.id}>
                  {group.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Button onClick={updateStatistics}>Push me!</Button>
      </Grid>
    );
  }),
);

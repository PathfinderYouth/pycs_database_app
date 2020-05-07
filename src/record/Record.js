import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { participantStore } from '../injectables';
import { makeStyles } from '@material-ui/core';
import { TopNavBar } from '../database/components';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3),
  },
}));

export const Record = inject('participantStore')(
  observer(() => {
    //TODO stuff with the participantStore
    const classes = useStyles();
    return (
      <div className={`${classes.root} root`}>
        <TopNavBar />
      </div>
    )
  })
)
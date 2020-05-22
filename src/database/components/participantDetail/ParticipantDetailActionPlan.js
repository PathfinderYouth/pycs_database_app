import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { actionPlanField } from '../../../fields';
import { participantStore } from '../../../injectables';
import { status } from '../../../constants';
import service from '../../../facade/service';
import '../style/ParticipantDetailPage.css';

export const ParticipantDetailActionPlan = inject('participantStore')(
  observer(({ user: userID }) => {
    const { currentParticipant, setCurrentParticipant } = participantStore;
    const { label } = actionPlanField;
    const [editState, setEditState] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    let participantName;
    let participantStatus;
    let participantActionPlan;
    if (!!currentParticipant) {
      const {
        nameLast,
        nameGiven,
        status: currentParticipantStatus,
        actionPlan,
      } = currentParticipant;
      participantName = nameLast !== '' ? `${nameGiven} ${nameLast}` : undefined;
      participantStatus = currentParticipantStatus;
      participantActionPlan = actionPlan;
    }
    const [actionPlanFieldValue, setActionPlanFieldValue] = useState(
      !!participantActionPlan ? participantActionPlan.text : '',
    );

    const handleChange = ({ target: { value } }) => {
      setActionPlanFieldValue(value);
    };

    const handleActionPlanSubmit = (values) => {
      const db = service.getDatabase();
      participantStatus === status.NEW
        ? db.updateNew(
            currentParticipant,
            values,
            userID,
            (updatedParticipant) => {
              enqueueSnackbar('Action plan updated.', {
                variant: 'success',
              });
              setCurrentParticipant(updatedParticipant);
              setSubmitting(false);
              setEditState(false);
            },
            () => {
              enqueueSnackbar('There was a problem updating the action plan.', {
                variant: 'error',
              });
              setSubmitting(false);
            },
          )
        : db.updatePermanent(
            currentParticipant,
            values,
            userID,
            (updatedParticipant) => {
              enqueueSnackbar('Action plan updated.', {
                variant: 'success',
              });
              setCurrentParticipant(updatedParticipant);
              setSubmitting(false);
              setEditState(false);
            },
            () => {
              enqueueSnackbar('There was a problem updating the action plan.', {
                variant: 'error',
              });
              setSubmitting(false);
            },
          );
    };

    const handleClickUpdateActionPlan = () => {
      const lastEdited = moment.utc().format();
      const newActionPlan = {
        text: actionPlanFieldValue,
        timeStamp: lastEdited,
        user: userID,
      };
      if (window.confirm('Update action plan? Previous action plan will be overwritten.')) {
        const newValues = {
          ...currentParticipant,
          actionPlan: newActionPlan,
        };
        setSubmitting(true);
        handleActionPlanSubmit(newValues);
      }
    };

    const formatDate = (timestamp) => {
      return moment(timestamp).format('ddd, MMM D YYYY, h:mm a');
    };

    const getTimeStamp = ({ user, timeStamp }) =>
      `Last edited by ${user} on ${formatDate(timeStamp)}`;

    const getActionPlanContents = () =>
      editState ? (
        <>
          <TextField
            variant="outlined"
            label={label}
            value={actionPlanFieldValue}
            onChange={handleChange}
            fullWidth
            multiline
          />
          <div className="participant-notes-ap-addButton">
            <Typography variant="body2" color="textSecondary">
              {!!participantActionPlan && getTimeStamp(participantActionPlan)}
            </Typography>
            <div>
              <Button
                color="primary"
                disabled={isSubmitting}
                onClick={() => {
                  if (window.confirm('Discard changes? Action plan will not be saved.')) {
                    setEditState(false);
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                disabled={isSubmitting}
                onClick={() => handleClickUpdateActionPlan()}
              >
                Update action plan
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="participant-ap-text">
            <Typography>
              {!!participantActionPlan ? (
                participantActionPlan.text
              ) : (
                <em>No action plan set yet</em>
              )}
            </Typography>
          </div>
          <div className="participant-notes-ap-addButton">
            <Typography variant="body2" color="textSecondary">
              {!!participantActionPlan && getTimeStamp(participantActionPlan)}
            </Typography>
            <div>
              <Button color="primary" variant="contained" onClick={() => setEditState(true)}>
                Update action plan
              </Button>
            </div>
          </div>
        </>
      );

    return (
      <>
        <div className="participant-detail-header">
          <div className="participant-detail-header-text">
            <Typography variant="h6">{`Participant Details - Action Plan`}</Typography>
            <Typography variant="h5">{participantName}</Typography>
          </div>
        </div>
        <FormControl component="fieldset" fullWidth>
          <div className="participant-detail-form-contents">{getActionPlanContents()}</div>
        </FormControl>
      </>
    );
  }),
);

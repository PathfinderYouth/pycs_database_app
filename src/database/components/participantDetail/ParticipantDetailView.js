import React, { useState } from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { useSnackbar } from 'notistack';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { ParticipantDetailPageHeader } from './ParticipantDetailPageHeader';
import { ParticipantApproveDialog } from './ParticipantApproveDialog';
import { participantDetailSteps } from '../../../fields';
import { masks, participantDetailViewModes, status } from '../../../constants';
import service from '../../../facade/service';
import '../style/ParticipantDetailView.css';

/**
 * Component used to display participant details
 * @param {Object} participant participant data object
 * @param {int} currentStep index of the current step in participantDetailSteps
 * @param {user} string userID (display name or email) of the currently-logged-in user
 * @param {function} handleClickChangeMode toggle function that switches between view and edit mode in UIStore
 * @param {function} handleClickChangeView function that changes the view mode from 'detail' to 'list'
 */
export const ParticipantDetailView = ({
  participant,
  currentStep,
  user,
  handleClickChangeMode,
  handleClickChangeView,
}) => {
  const step = participantDetailSteps[currentStep];
  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, setDialogOpen] = useState(false);

  /**
   * Renders a clickable masked sin component that reveals the full sin when clicked on
   * @param {string} sin social insurance number
   */
  const MaskedSIN = ({ sin }) => {
    const maskedSIN = `XXX XXX ${sin.slice(6)} (click to show)`;
    const formattedSIN = <NumberFormat value={sin} format={masks.sin} displayType="text" />;
    const [showSIN, setShowSIN] = useState(false);
    return (
      <div className="participant-detail-SIN">
        <Typography color="textSecondary" onClick={() => setShowSIN(!showSIN)}>
          {showSIN ? formattedSIN : maskedSIN}
        </Typography>
      </div>
    );
  };

  /**
   * Renders and formats field data for display in ParticipantDetailView
   * @param {Object} field field object
   * @param {string | array | undefined} data field data
   */
  const renderFieldData = (field, data) => {
    const { name, type, mask, adornment } = field;
    let renderedData = null;

    if (data === undefined || data.length === 0) {
      renderedData = <em>None</em>;
    } else if (name === 'sin') {
      return <MaskedSIN sin={data} />;
    } else if (type === 'date') {
      renderedData = moment(data).format('MMM D, YYYY');
    } else if (mask) {
      renderedData = (
        <NumberFormat
          name={name}
          value={data}
          format={
            ['phoneHome', 'phoneCell', 'phoneWork'].includes(name) ? masks.phone : masks[name]
          }
          displayType="text"
          prefix={adornment}
          thousandSeparator={!!adornment}
          decimalScale={2}
          fixedDecimalScale={!!adornment}
          isNumericString
        />
      );
    } else {
      renderedData = Array.isArray(data) ? data.join(', ') : data;
    }
    return <Typography color="textSecondary">{renderedData}</Typography>;
  };

  /**
   * Initiates a connection to the database to move a participant record from the new collection to the
   * permanent collection in Firestore
   * Once complete, shows a snackbar indicating success or fail
   */
  const handleClickMove = () => {
    const db = service.getDatabase();
    db.moveToPermanent(
      participant,
      user,
      () => {
        enqueueSnackbar('Participant record saved to database.', {
          variant: 'success',
        });
        handleClickChangeView();
      },
      () => {
        enqueueSnackbar('There was a problem saving the participant record.', {
          variant: 'error',
        });
        handleClickChangeView();
      },
    );
  };

  /**
   * Initiates a connection to the database to delete a participant record, depending on the record status.
   * If new, deletes the record from the new collection
   * If archived, deletes the record from the permanent collection
   * If any other status, sets the record to archived status
   * Once complete, shows a snackbar indicating success or fail.
   */
  const handleClickDelete = () => {
    const db = service.getDatabase();
    const { id: docID, status: participantStatus } = participant;
    if (participantStatus === status.NEW) {
      db.deleteNew(
        docID,
        () => {
          enqueueSnackbar('Submission deleted.');
          handleClickChangeView();
        },
        () => {
          enqueueSnackbar('There was a problem deleting the submission.', {
            variant: 'error',
          });
          handleClickChangeView();
        },
      );
    } else if (participantStatus === status.ARCHIVED) {
      db.deletePermanent(
        docID,
        () => {
          enqueueSnackbar('Participant record deleted.');
          handleClickChangeView();
        },
        () => {
          enqueueSnackbar('There was a problem archiving the participant record.', {
            variant: 'error',
          });
          handleClickChangeView();
        },
      );
    } else {
      db.archivePermanent(
        participant,
        user,
        (updatedParticipant) => {
          enqueueSnackbar('Participant record archived.', {
            action: (
              <Button
                color="secondary"
                onClick={() => handleClickRestore(updatedParticipant, user)}
              >
                Undo
              </Button>
            ),
            autoHideDuration: 60000,
          });
          handleClickChangeView();
        },
        () => {
          enqueueSnackbar('There was a problem archiving the participant record.', {
            variant: 'error',
          });
          handleClickChangeView();
        },
      );
    }
  };

  /**
   * Initiates a connection to the database to set a participant record to their previous status before it
   * was archived
   * Once complete, shows a snackbar indicating success or fail
   */
  const handleClickRestore = (participant, user) => {
    const db = service.getDatabase();
    db.restorePermanent(
      participant,
      user,
      () => {
        enqueueSnackbar('Participant record restored.', { variant: 'success' });
        handleClickChangeView();
      },
      () => {
        enqueueSnackbar('There was a problem restoring the participant record.', {
          variant: 'error',
        });
        handleClickChangeView();
      },
    );
  };

  /**
   * Initiates a connection to the database to set a participant record to approved status
   * Once complete, shows a snackbar indicating success or fail
   */
  const handleClickApprove = (confirmationNumber) => {
    const db = service.getDatabase();
    db.approvePending(
      participant,
      user,
      confirmationNumber,
      () => {
        enqueueSnackbar('Participant approved.', { variant: 'success' });
        handleClickChangeView();
      },
      () => {
        enqueueSnackbar('There was a problem approving the participant.', {
          variant: 'error',
        });
        handleClickChangeView();
      },
    );
  };

  /**
   * Initiates a connection to the database to set a participant record to declined status
   * Once complete, shows a snackbar indicating success or fail
   */
  const handleClickDecline = () => {
    const db = service.getDatabase();
    db.declinePending(
      participant,
      user,
      () => {
        enqueueSnackbar('Participant declined.');
        handleClickChangeView();
      },
      () => {
        enqueueSnackbar('There was a problem declining the participant.', {
          variant: 'error',
        });
        handleClickChangeView();
      },
    );
  };

  return (
    <>
      <ParticipantDetailPageHeader
        title={`Viewing participant record - ${step.stepName}`}
        participant={participant}
        step={step}
        participantDetailViewMode={participantDetailViewModes.VIEW}
        handleClickToggleEdit={handleClickChangeMode}
        handleClickMove={handleClickMove}
        handleClickDelete={handleClickDelete}
        handleClickApprove={() => setDialogOpen(true)}
        handleClickDecline={handleClickDecline}
        handleClickRestore={() => handleClickRestore(participant, user)}
      >
        {step.fields.map((field) => {
          const { name, size, detailSize, prettyName } = field;
          // if both size & detailSize undefined, use true, else use detailSize if defined, size if not
          const viewSize = !detailSize && !size ? true : !!detailSize ? detailSize : size;
          return (
            !!participant && (
              <Grid key={name} item md={viewSize} xs={12}>
                <Typography variant="button">{prettyName}</Typography>{' '}
                {renderFieldData(field, participant[name])}
              </Grid>
            )
          );
        })}
      </ParticipantDetailPageHeader>
      <ParticipantApproveDialog
        open={openDialog}
        handleClickApprove={handleClickApprove}
        handleClose={() => setDialogOpen(false)}
      />
    </>
  );
};

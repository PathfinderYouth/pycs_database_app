import React, { useState, useContext } from 'react';
import { useSnackbar } from 'notistack';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import NumberFormat from 'react-number-format';
import { participantDetailSteps } from '../../fields';
import { ParticipantDetailPageHeader } from './ParticipantDetailPageHeader';
import { ParticipantApproveDialog } from './ParticipantApproveDialog';
import { participantDetailViewModes, collectionType, masks } from '../../constants';
import service from '../../facade/service';
import { AuthContext } from '../../sign-in';

import './style/ParticipantDetailView.css';

export const ParticipantDetailView = ({
  participant,
  collection,
  currentStep,
  handleClickChangeMode,
  handleClickChangeView,
}) => {
  const step = participantDetailSteps[currentStep];
  const {
    currentUser: { email, displayName },
  } = useContext(AuthContext);
  const userID = !!displayName ? displayName : email;
  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, setDialogOpen] = useState(false);

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

  const renderFieldData = (field, data) => {
    const { name, adornment } = field;
    let renderedData = null;
    if (data.length === 0 || data === undefined) {
      renderedData = <em>None</em>;
    } else if (field.name === 'sin') {
      return <MaskedSIN sin={data} />;
    } else {
      if (field.mask) {
        renderedData = (
          <NumberFormat
            name={name}
            value={data}
            format={name.toLowerCase().includes('phone') ? masks.phone : masks[name]}
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
    }
    return <Typography color="textSecondary">{renderedData}</Typography>;
  };

  const handleClickMove = () => {
    const db = service.getDatabase();
    db.moveToPermanent(
      participant,
      userID,
      (updatedParticipant) => {
        enqueueSnackbar('Participant record saved to database.', {
          variant: 'success',
        });
        handleClickChangeView();
      },
      (error) => {
        enqueueSnackbar('There was a problem saving the participant record.', {
          variant: 'error',
        });
        handleClickChangeView();
      },
    );
  };

  const handleClickDelete = () => {
    const db = service.getDatabase();
    const { id: docID } = participant;
    collection === collectionType.NEW
      ? db.deleteNew(
          docID,
          (success) => {
            enqueueSnackbar('Submission deleted.');
            handleClickChangeView();
          },
          (error) => {
            enqueueSnackbar('There was a problem updating the submission.', {
              variant: 'error',
            });
            handleClickChangeView();
          },
        )
      : db.deletePermanent(
          participant,
          userID,
          (success) => {
            enqueueSnackbar('Participant record removed. Undo?');
            handleClickChangeView();
          },
          (error) => {
            enqueueSnackbar('There was a problem removing the participant record.', {
              variant: 'error',
            });
            handleClickChangeView();
          },
        );
  };

  const handleClickApprove = (confirmationNumber) => {
    const db = service.getDatabase();
    db.approvePending(
      participant,
      userID,
      confirmationNumber,
      (success) => {
        enqueueSnackbar('Participant approved.', { variant: 'success' });
        handleClickChangeView();
      },
      (error) => {
        enqueueSnackbar('There was a problem approving the participant.', {
          variant: 'error',
        });
        handleClickChangeView();
      },
    );
  };

  const handleClickDecline = () => {
    const db = service.getDatabase();
    db.declinePending(
      participant,
      userID,
      (success) => {
        enqueueSnackbar('Participant declined.');
        handleClickChangeView();
      },
      (error) => {
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
        collection={collection}
        participantDetailViewMode={participantDetailViewModes.VIEW}
        handleClickChangeMode={handleClickChangeMode}
        handleClickMove={handleClickMove}
        handleClickDelete={handleClickDelete}
        handleOpenDialog={() => setDialogOpen(true)}
        handleClickDecline={handleClickDecline}
      >
        {step.fields.map((field) => {
          const { name, size, detailSize, prettyName } = field;
          // if both size & detailSize undefined, use true, else use detailSize if defined, size if not
          const viewSize = !detailSize && !size ? true : !!detailSize ? detailSize : size;
          return (
            <Grid key={name} item md={viewSize} xs={12}>
              <Typography variant="button">{prettyName}</Typography>{' '}
              {renderFieldData(field, participant[name])}
            </Grid>
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

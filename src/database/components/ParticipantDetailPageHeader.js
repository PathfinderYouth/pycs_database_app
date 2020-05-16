import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import { collectionType, participantDetailViewModes, STATUS } from '../../constants';
import './style/ParticipantDetailView.css';

export const ParticipantDetailPageHeader = ({
  children,
  title,
  participant = undefined,
  collection = undefined,
  participantDetailViewMode = undefined,
  handleSubmit = undefined,
  handleClickChangeMode = undefined,
  handleClickMove = undefined,
  handleClickDelete = undefined,
  handleClickApprove = undefined,
  handleClickDecline = undefined,
}) => {
  const { nameGiven, nameLast } = participant;
  const participantName = nameLast !== '' ? `${nameGiven} ${nameLast}` : undefined;

  const getButtons = () => {
    return participantDetailViewMode === participantDetailViewModes.VIEW ? (
      collection === collectionType.NEW ? (
        <div>
          <Tooltip title="Edit submission" aria-label="edit">
            <IconButton onClick={handleClickChangeMode}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Accept and save" aria-label="accept">
            <IconButton
              onClick={() => {
                if (window.confirm('Accept and save this submission to the database?')) {
                  handleClickMove();
                }
              }}
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Discard submission" aria-label="delete">
            <IconButton
              onClick={() => {
                if (window.confirm('Discard submission? This cannot be undone.')) {
                  handleClickDelete();
                }
              }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <div>
          <Tooltip title="Edit participant record" aria-label="edit">
            <IconButton onClick={handleClickChangeMode}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          {!!participant && participant.status !== STATUS.approved && (
            <Tooltip title="Approve participant" aria-label="approve">
              <IconButton
                onClick={() => {
                  if (window.confirm('Approve participant?')) {
                    handleClickApprove();
                  }
                }}
              >
                <ThumbUpIcon />
              </IconButton>
            </Tooltip>
          )}
          {!!participant && participant.status !== STATUS.declined && (
            <Tooltip title="Decline participant" aria-label="decline">
              <IconButton
                onClick={() => {
                  if (window.confirm('Decline participant?')) {
                    handleClickDecline();
                  }
                }}
              >
                <ThumbDownIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Delete participant record" aria-label="delete">
            <IconButton
              onClick={() => {
                if (window.confirm('Delete participant record?')) {
                  handleClickDelete();
                }
              }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </div>
      )
    ) : (
      <div>
        <Tooltip title="Save participant record" aria-label="confirm">
          <IconButton
            onClick={() => {
              if (window.confirm('Save changes?')) {
                handleSubmit();
              }
            }}
          >
            <DoneIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Discard changes" aria-label="discard">
          <IconButton onClick={() => {
              if (window.confirm('Discard changes? Record will not be saved.')) {
                handleClickChangeMode();
              }
            }}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  return (
    <>
      <div className="participant-detail-header">
        <div className="participant-detail-header-text">
          <Typography variant="h6">{title}</Typography>
          <Typography variant="h5">{participantName}</Typography>
        </div>
        <div className="participant-detail-controls">{getButtons()}</div>
      </div>
      <div className="participant-detail-form-contents">
        <Grid container spacing={2}>
          {children}
        </Grid>
      </div>
    </>
  );
};

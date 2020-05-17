import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { StatusIndicator } from '../StatusIndicator';
import { collectionType, participantDetailViewModes, status } from '../../../constants';
import '../style/ParticipantDetailView.css';

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
  handleOpenDialog = undefined,
  handleClickDecline = undefined,
}) => {
  const { nameGiven, nameLast, status: participantStatus } = participant;
  const participantName = nameLast !== '' ? `${nameGiven} ${nameLast}` : undefined;

  const getButtons = () => {
    return participantDetailViewMode === participantDetailViewModes.VIEW ? (
      collection === collectionType.NEW ? (
        <div className="participant-detail-controls">
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
        <div className="participant-detail-controls">
          <Tooltip title="Edit participant record" aria-label="edit">
            <IconButton onClick={handleClickChangeMode}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          {!!participant && participant.status !== status.APPROVED && (
            <Tooltip title="Approve participant" aria-label="approve">
              <IconButton onClick={handleOpenDialog}>
                <ThumbUpIcon />
              </IconButton>
            </Tooltip>
          )}
          {!!participant && participant.status !== status.DECLINED && (
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
          <Tooltip title="Archive participant record" aria-label="archive">
            <IconButton
              onClick={() => {
                if (window.confirm('Archive participant record?')) {
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
      <div className="participant-detail-controls">
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
          <IconButton
            onClick={() => {
              if (window.confirm('Discard changes? Record will not be saved.')) {
                handleClickChangeMode();
              }
            }}
          >
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
        <div className="participant-detail-buttons-indicator">
          {getButtons()}
          <div className="participant-detail-status">
            <StatusIndicator status={participantStatus} />
          </div>
        </div>
      </div>
      <div className="participant-detail-form-contents">
        <Grid container spacing={2}>
          {children}
        </Grid>
      </div>
    </>
  );
};

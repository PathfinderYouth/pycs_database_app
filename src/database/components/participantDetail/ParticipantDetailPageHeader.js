import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import { DetailButton } from './DetailButton';
import { StatusIndicator } from '../StatusIndicator';
import { uiStore } from '../../../injectables';
import { collectionType, participantDetailViewModes, status } from '../../../constants';
import { belongsToStepIndex } from '../../../fields';
import '../style/ParticipantDetailView.css';

export const ParticipantDetailPageHeader = ({
  children,
  title,
  form = undefined,
  participant = undefined,
  participantDetailViewMode = undefined,
  handleClickToggleEdit = undefined,
  handleClickMove = undefined,
  handleClickDelete = undefined,
  handleClickApprove = undefined,
  handleClickDecline = undefined,
  handleClickRestore = undefined,
}) => {
  const { nameGiven, nameLast, status: participantStatus } = participant;
  const participantName = nameLast !== '' ? `${nameGiven} ${nameLast}` : undefined;
  const { enqueueSnackbar } = useSnackbar();
  const { setCurrentParticipantDetailStep } = uiStore;

  useEffect(() => {
    if (!!form) {
      form.validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Navigates to the first form step with errors
   * @param Object errors
   */
  const handleFormErrors = (errors) => {
    const error = Object.entries(errors)[0];
    if (!!error) {
      const errorMessage = error[1];
      const fieldName = error[0];
      enqueueSnackbar(errorMessage, { variant: 'error' });
      setCurrentParticipantDetailStep(belongsToStepIndex(fieldName));
    }
  };

  const handleClickSave = () => {
    const { submitForm, errors } = form;
    submitForm().catch(handleFormErrors(errors))
  }

  const buttonsMap = {
    approve: {
      ariaLabel: 'approve',
      tooltip: 'Approve participant',
      onClick: handleClickApprove,
      icon: ThumbUpIcon,
    },
    archive: {
      ariaLabel: 'archive',
      tooltip: 'Archive participant record',
      onClick: handleClickDelete,
      confirm: 'Archive participant record?',
      icon: ArchiveIcon,
    },
    cancel: {
      ariaLabel: 'cancel',
      tooltip: 'Discard changes',
      onClick: handleClickToggleEdit,
      confirm: 'Discard changes? Changes will not be saved.',
      icon: CloseIcon,
      color: 'error',
    },
    decline: {
      ariaLabel: 'decline',
      tooltip: 'Decline participant',
      onClick: handleClickDecline,
      confirm: 'Decline participant?',
      icon: ThumbDownIcon,
    },
    delete: {
      ariaLabel: 'delete',
      tooltip: 'Delete participant record',
      onClick: handleClickDelete,
      confirm: 'Delete participant record? This cannot be undone.',
      icon: DeleteIcon,
      color: 'error',
    },
    edit: {
      ariaLabel: 'edit',
      tooltip: 'Edit participant record',
      onClick: handleClickToggleEdit,
      icon: EditIcon,
    },
    move: {
      ariaLabel: 'accept',
      tooltip: 'Accept and save',
      onClick: handleClickMove,
      confirm: 'Accept and save this submission to the database?',
      icon: SaveIcon,
    },
    restore: {
      ariaLabel: 'restore',
      tooltip: 'Restore participant record',
      onClick: handleClickRestore,
      confirm: 'Restore participant record?',
      icon: UnarchiveIcon,
    },
    save: {
      ariaLabel: 'confirm',
      tooltip: 'Save changes',
      onClick: handleClickSave,
      confirm: 'Save changes?',
      icon: DoneIcon,
    },
  };

  const buttonStatusMap = {
    new: [
      {
        ...buttonsMap.edit,
        tooltip: 'Edit submission',
      },
      buttonsMap.move,
      {
        ...buttonsMap.delete,
        tooltip: 'Discard submission',
        confirm: 'Discard submission? This cannot be undone.',
      },
    ],
    pending: [buttonsMap.edit, buttonsMap.approve, buttonsMap.decline, buttonsMap.archive],
    approved: [buttonsMap.edit, buttonsMap.decline, buttonsMap.archive],
    declined: [buttonsMap.edit, buttonsMap.approve, buttonsMap.archive],
    archived: [buttonsMap.restore, buttonsMap.delete],
  };

  const editButtons = [buttonsMap.save, buttonsMap.cancel];

  const createButtons = [
    {
      ...buttonsMap.save,
      tooltip: 'Create participant record',
      confirm: 'Create new participant record?',
    },
    buttonsMap.cancel,
  ];

  const getButtons = () => {
    let buttons;
    if (participantDetailViewMode === participantDetailViewModes.VIEW) {
      buttons = buttonStatusMap[participant.status];
    } else if (participantDetailViewMode === participantDetailViewModes.EDIT) {
      buttons = editButtons;
    } else {
      buttons = createButtons;
    }
    return (
      <div className="participant-detail-controls">
        {buttons.map((button) => (
          <DetailButton key={button.ariaLabel} {...button} />
        ))}
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
          {!!participantStatus && (
            <div className="participant-detail-status">
              <StatusIndicator status={participantStatus} />
            </div>
          )}
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

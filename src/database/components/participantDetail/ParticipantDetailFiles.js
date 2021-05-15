import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import { fileField } from '../../../fields';
import { participantStore } from '../../../injectables';
import { status } from '../../../constants';
import service from '../../../facade/service';
import '../style/ParticipantDetailFiles.css';
import '../style/ParticipantDetailPage.css';

/**
 * Participant files page component that utilizes the specialized fileField
 * @param {string} user userID (display name or email)
 */
export const ParticipantDetailFiles = inject('participantStore')(
  observer(({ user }) => {
    const { currentParticipant, setCurrentParticipant } = participantStore;
    const { label } = fileField;
    const [newFileValue, setNewFileValue] = useState(null);
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    // if currentParticipant is defined, extract the name, status, and files, else leave undefined
    let participantName;
    let participantStatus;
    let files = [];
    if (!!currentParticipant) {
      const {
        nameLast,
        nameGiven,
        files: participantFiles,
        status: currentParticipantStatus,
      } = currentParticipant;
      participantName = nameLast !== '' ? `${nameGiven} ${nameLast}` : undefined;
      participantStatus = currentParticipantStatus;
      files = !!participantFiles ? participantFiles : [];
    }

    /**
     * OnChange handler for file field
     * @param {Object} event
     */
    const handleChange = ({ target: { value } }) => {
      if (value !== '') {
        setError(false);
      }
      setNewFileValue(value);
    };

    /**
     * OnSubmit handler for file field
     * @param {Object} values form values object
     */
    const handleFileSubmit = (values) => {
      const db = service.getDatabase();
      participantStatus === status.NEW
        ? db.updateNew(
            currentParticipant,
            values,
            user,
            (updatedParticipant) => {
              enqueueSnackbar('File added.', {
                variant: 'success',
              });
              setCurrentParticipant(updatedParticipant);
              setNewFileValue(null);
              setSubmitting(false);
            },
            () => {
              enqueueSnackbar('There was a problem adding the file.', {
                variant: 'error',
              });
              setSubmitting(false);
            },
          )
        : db.updatePermanent(
            currentParticipant,
            values,
            user,
            (updatedParticipant) => {
              enqueueSnackbar('File added.', {
                variant: 'success',
              });
              setCurrentParticipant(updatedParticipant);
              setNewFileValue('');
              setSubmitting(false);
            },
            () => {
              enqueueSnackbar('There was a problem adding the file.', {
                variant: 'error',
              });
              setSubmitting(false);
            },
          );
    };

    /**
     * Creates a file object. If the files field is empty, show an error message, if not, create a files
     * object with the file text, timestamp, and username.
     */
    const addFile = () => {
      if (newFileValue === null) {
        setError(true);
      } else {
        const now = moment.utc().format();
        const file = {
          text: newFileValue,
          timeStamp: now,
          user: user,
        };

        // inserts the file as into front of the list of files
        const newFiles = [file, ...files];
        if (window.confirm('Add new file?')) {
          const newValues = {
            ...currentParticipant,
            files: newFiles,
          };
          setSubmitting(true);
          handleFileSubmit(newValues);
        }
      }
    };

    /**
     * Formats the file into a more readable string
     * @param {string} timestamp UTC date string
     */
    const formatDate = (timestamp) => {
      return moment(timestamp).format('ddd, MMM D YYYY, h:mm a');
    };

    return (
      <>
        <div className="participant-detail-header">
          <div className="participant-detail-header-text">
            <Typography variant="h6">{`Participant Files`}</Typography>
            <Typography variant="h5">{participantName}</Typography>
          </div>
        </div>
        <FormControl component="fieldset" fullWidth>
          <div className="participant-detail-form-contents">
            <TextField
              variant="outlined"
              label={label}
              value={newFileValue}
              onChange={handleChange}
              error={error}
              helperText={error && 'File cannot be blank'}
              fullWidth
              multiline
            />
            <div className="participant-files-ap-addButton">
              <Button
                color="primary"
                variant="contained"
                disabled={isSubmitting}
                onClick={() => addFile()}
              >
                Add File
              </Button>
            </div>
            <div className="field-files-historyContainer">
              {files.length > 0 ? (
                files.map((file, index) => {
                  const { timeStamp, text, user } = file;
                  return (
                    <div key={`file-${index}`}>
                      <div className="field-files-fileContainer">
                        <div className="field-files-fileHeader">
                          <Typography>{formatDate(timeStamp)}</Typography>
                          <Typography>{user}</Typography>
                        </div>
                        <div className="field-files-fileBody">
                          <Typography color="textSecondary">{text}</Typography>
                        </div>
                      </div>
                      {index !== files.length - 1 && <Divider />}
                    </div>
                  );
                })
              ) : (
                <div className="field-files-emptyHistory">
                  <Typography variant="body2" color="textSecondary">
                    No files to display
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </FormControl>
      </>
    );
  }),
);

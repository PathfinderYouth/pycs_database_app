import React, { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import { useSnackbar } from 'notistack';
import { noteField } from '../../fields';
import service from '../../facade/service';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import { participantStore } from '../../injectables';
import { AuthContext } from '../../sign-in';
import { collectionType } from '../../constants';
import './style/ParticipantDetailNotes.css';
import './style/ParticipantDetailPage.css';

export const ParticipantDetailNotes = inject('participantStore')(
  observer(() => {
    const {
      currentParticipant,
      setCurrentParticipant,
      collection,
    } = participantStore;
    const { label } = noteField;
    const {
      currentUser: { email: userID },
    } = useContext(AuthContext);
    const [newNoteFieldValue, setNewNoteFieldValue] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const notes = !!currentParticipant.notes ? currentParticipant.notes : [];

    const handleChange = ({ target: { value } }) => {
      setNewNoteFieldValue(value);
    };

    const handleNoteSubmit = (values) => {
      const db = service.getDatabase();
      collection === collectionType.NEW
        ? db.updateNew(
            currentParticipant,
            values,
            userID,
            (updatedParticipant) => {
              enqueueSnackbar('Note added.', {
                variant: 'success',
              });
              setCurrentParticipant(updatedParticipant);
              setNewNoteFieldValue('');
              setSubmitting(false);
            },
            (error) => {
              enqueueSnackbar('There was a problem adding the note.', {
                variant: 'error',
              });
            },
          )
        : db.updatePermanent(
            currentParticipant,
            values,
            userID,
            (updatedParticipant) => {
              enqueueSnackbar('Note added.', {
                variant: 'success',
              });
              setCurrentParticipant(updatedParticipant);
              setNewNoteFieldValue('');
              setSubmitting(false);
            },
            (error) => {
              enqueueSnackbar('There was a problem adding the note.', {
                variant: 'error',
              });
            },
          );
    };

    const addNote = () => {
      const now = moment.utc().format();
      const note = {
        text: newNoteFieldValue,
        timeStamp: now,
        user: userID,
      };

      const newNotes = [note, ...notes];
      if (window.confirm('Add new note?')) {
        const newValues = {
          ...currentParticipant,
          notes: newNotes,
        };
        setSubmitting(true);
        handleNoteSubmit(newValues);
      }
    };

    const formatDate = (timestamp) => {
      return moment(timestamp).format('ddd, MMM D YYYY, h:mm a');
    };

    return (
      <>
        <div className="participant-detail-header">
          <Typography variant="h6">{`Participant Details - Notes`}</Typography>
        </div>
        <FormControl component="fieldset" fullWidth>
          <div className="participant-detail-form-contents">
            <TextField
              variant="outlined"
              label={label}
              value={newNoteFieldValue}
              onChange={handleChange}
              fullWidth
              multiline
            />
            <div className="participant-notes-addButton">
              <Button
                color="primary"
                variant="contained"
                disabled={isSubmitting}
                onClick={() => addNote()}
              >
                Add Note
              </Button>
            </div>
            <div className="field-notes-historyContainer">
              <Typography variant="h5" gutterBottom>
                Notes history
              </Typography>
              <Divider />
              {notes.length > 0 ? (
                notes.map((note, index) => {
                  const { timeStamp, text, user } = note;
                  return (
                    <div key={`note-${index}`}>
                      <div className="field-notes-noteContainer">
                        <div className="field-notes-noteHeader">
                          <Typography>{formatDate(timeStamp)}</Typography>
                          <Typography>{user}</Typography>
                        </div>
                        <div className="field-notes-noteBody">
                          <Typography color="textSecondary">{text}</Typography>
                        </div>
                      </div>
                      {index !== notes.length - 1 && <Divider />}
                    </div>
                  );
                })
              ) : (
                <div className="field-notes-emptyHistory">
                  <Typography variant="body2" color="textSecondary">
                    No notes to display
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

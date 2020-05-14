import React, { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { inject, observer } from 'mobx-react';
import { participantStore } from '../injectables';
import { AuthContext } from '../sign-in';
import './FormFields.css';

export const FormNotesField = inject('participantStore')(observer(({ form, field, onSubmit }) => {
  const { setFieldValue, isSubmitting, setSubmitting } = form;
  const { currentParticipant } = participantStore;
  const { name, label } = field;
  const {
    currentUser: { email: userID },
  } = useContext(AuthContext);
  const [newNoteFieldValue, setNewNoteFieldValue] = useState('');
  const notes = !!currentParticipant.notes ? currentParticipant.notes : [] 

  const handleChange = ({ target: { value } }) => {
    setNewNoteFieldValue(value);
  };

  const addNote = () => {
    const now = new Date().toUTCString();
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
      onSubmit(newValues, setSubmitting); // pushes just updated note field to db
      setFieldValue(name, newNotes); // sets notes in form
      setNewNoteFieldValue(''); // clears field in UI
    }
  };

  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const timeString = date.toLocaleTimeString('en-CA');
    const dateString = date.toLocaleDateString('en-CA', options);

    return `${dateString} - ${timeString}`;
  };

  return (
    <FormControl component="fieldset" fullWidth>
      <TextField
        variant="outlined"
        label={label}
        value={newNoteFieldValue}
        onChange={handleChange}
        multiline
      />
      <div className="field-notes-addButton">
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
    </FormControl>
  );
}));

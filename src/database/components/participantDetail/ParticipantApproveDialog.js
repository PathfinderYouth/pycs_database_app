import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const ParticipantApproveDialog = ({ open, handleClickApprove, handleClose }) => {
  const [fieldValue, setFieldValue] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);

  const handleChange = ({ target: { value } }) => {
    setFieldValue(value);
  };

  const handleSubmit = () => {
    if (fieldValue === '') {
      setErrorStatus(true);
    } else {
      if (window.confirm('Approve this participant?')) {
        handleClickApprove(fieldValue);
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Enter confirmation number</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To approve this participant, please enter a confirmation number:
        </DialogContentText>
        <TextField
          autoFocus
          error={errorStatus}
          value={fieldValue}
          onChange={handleChange}
          variant="outlined"
          label="Confirmation number"
          helperText={errorStatus && 'Field cannot be empty'}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setErrorStatus(false);
            handleClose();
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
};

import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import MenuItem from '@material-ui/core/MenuItem';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { userRole } from '../../../constants';
import service from '../../../facade/service';
import '../style/UserManagement.css';

/**
 * User editing and creating dialog
 * @param {Object} user object
 * @param {boolean} isCurrentUser flag if the user clicked on is the current user
 * @param {boolean} open open state of the dialog
 * @param {function} setOpen open dialog handler function
 * @param {string} mode edit or create mode
 */
export const UserDialog = ({
  user = undefined,
  isCurrentUser = undefined,
  open,
  setOpen,
  mode = 'edit',
}) => {
  let db = service.getUserList();
  const { enqueueSnackbar } = useSnackbar();

  // initial values for add new user form
  const initialValues = {
    email: '',
    name: '',
    role: userRole.STAFF,
  };

  // validation schema for add new user form
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Please enter a valid email address'),
    name: yup.string().required('Display name is required'),
  });

  /**
   * Formats user data and initiates a connection to the Firestore database to add a new user, showing a
   * snackbar on success or on error
   * @param {Object} values key value paired form values object
   * @param {function} resetForm Formik reset form function
   */
  const handleAddNewUser = (values, resetForm) => {
    db.addUser(
      values,
      () => {
        enqueueSnackbar('New user successfully created.', {
          variant: 'success',
        });
        setOpen(false);
        resetForm();
      },
      () => {
        enqueueSnackbar('There was a problem creating a new user.', {
          variant: 'error',
        });
      },
    );
  };

  /**
   * Formats user data and initiates a connection to the Firestore database to update the user, showing a
   * snackbar on success or on error
   * @param {Object} values key value paired form values object
   */
  const handleEditUser = (values) => {
    const docID = values.id;
    let data = { ...values };
    delete data.id;
    delete data.uid;
    db.updateUser(
      docID,
      data,
      () => {
        enqueueSnackbar('User information successfully updated.', {
          variant: 'success',
        });
        setOpen(false);
      },
      () => {
        enqueueSnackbar('There was a problem updating user information.', {
          variant: 'error',
        });
        setOpen(false);
      },
    );
  };

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
      <DialogTitle id="form-dialog-title">
        {mode === 'edit' ? 'Edit User Account' : 'Create User Account'}
      </DialogTitle>
      <Formik
        initialValues={mode === 'edit' ? user : initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          mode === 'edit' ? handleEditUser(values) : handleAddNewUser(values, resetForm);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, submitForm }) => (
          <>
            <DialogContent>
              {mode === 'create' && (
                <DialogContentText gutterBottom>
                  In order to finish account creation, the new user must log in using the email
                  address just provided. The password they enter the first time they log in will be
                  the password associated with their account.
                </DialogContentText>
              )}
              <div className="user-management-new-user-field">
                <TextField
                  required
                  variant="outlined"
                  name="email"
                  label="Email address"
                  type="email"
                  value={values.email}
                  error={!!errors.email && touched.email}
                  helperText={!!errors.email && touched.email && errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
              </div>
              <div className="user-management-new-user-field">
                <TextField
                  required
                  variant="outlined"
                  label="Name"
                  name="name"
                  value={values.name}
                  error={!!errors.name && touched.name}
                  helperText={!!errors.name && touched.name && errors.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
              </div>
              <div className="user-management-new-user-field">
                <TextField
                  required
                  label="Role"
                  name="role"
                  variant="outlined"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isCurrentUser}
                  helperText={isCurrentUser && 'Unable to change own role'}
                  fullWidth
                  select
                >
                  <MenuItem value={userRole.STAFF}>Staff</MenuItem>
                  <MenuItem value={userRole.ADMIN}>Admin</MenuItem>
                </TextField>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={() => submitForm()} variant="contained" color="primary">
                {mode === 'edit' ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

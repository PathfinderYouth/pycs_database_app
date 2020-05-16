import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { RecordSearchBar } from './RecordSearchBar';
import { SortingTableHead } from './SortingTableHead';
import { uiStore, participantStore, userStore } from '../../injectables';
import { viewModes, participantDetailViewModes, collectionType } from '../../constants';
import './style/ListContainer.css';
import service from '../../facade/service';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(2),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

export const ListContainer = inject(
  'uiStore',
  'participantStore',
  'userStore',
)(
  observer(
    ({
      records,
      onRowClicked,
      onPrevButtonClicked,
      onNextButtonClicked,
      nextButtonDisabled,
      onChangeRowsPerPage,
      onOrderChanged,
      onSearchClicked,
    }) => {
      const classes = useStyles();
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(20);
      const { collection } = participantStore;
      const { users } = userStore;
      const {
        headers,
        setCurrentViewMode,
        currentDetailViewMode,
        currentViewMode,
        currentListViewOrder,
        currentListViewOrderBy,
        setCurrentListViewOrder,
        setCurrentListViewOrderBy,
        setCurrentParticipantDetailViewMode,
      } = uiStore;

      const pageTitle = currentViewMode === viewModes.PARTICIPANT_LIST ? 'Participants' : 'Staff';

      const handleClickNew = () => {
        setCurrentViewMode(viewModes.PARTICIPANT_DETAIL);
        setCurrentParticipantDetailViewMode(participantDetailViewModes.CREATE);
      };

      const handleRowClicked = (clickedRow) => {
        onRowClicked(clickedRow);
        setCurrentViewMode(currentDetailViewMode);
        setCurrentParticipantDetailViewMode(participantDetailViewModes.VIEW);
      };

      const handleRequestSort = (event, property, queryProperty) => {
        setPage(0);
        const isAsc = currentListViewOrderBy === property && currentListViewOrder === 'asc';
        const order = isAsc ? 'desc' : 'asc';
        setCurrentListViewOrder(order);
        setCurrentListViewOrderBy(property);
        onOrderChanged(queryProperty, order);
      };

      const handleSearchClicked = (searchBy, searchText) => {
        setPage(0);
        onSearchClicked(searchBy, searchText);
      };

      const handleChangePage = (event, newPage) => {
        if (newPage < page) {
          onPrevButtonClicked();
        } else {
          onNextButtonClicked();
        }
        setPage(newPage);
      };

      const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(event.target.value);
        onChangeRowsPerPage(event.target.value);
      };

      const handleEditIconClicked = (event, row) => {
        // TODO onClick covert Typography into TextField
        // TODO handle Edit functionality of user management
      };

      const handleDeleteIconClicked = (event, row) => {
        // TODO handle Delete functionlity of user management
      };

      const [addStaffOpen, setAddStaffOpen] = useState(false);
      let db = service.getUserList();
      let existingUserEmails = [];
      useEffect(() => {
        users.map((user) => (existingUserEmails = [...existingUserEmails, user['email']]));
      });
      const [email, setEmail] = useState(null);
      const [name, setName] = useState(null);
      const [role, setRole] = useState(null);

      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };

      const handleNameChange = (event) => {
        setName(event.target.value);
      };

      const handleRoleChange = (event) => {
        setRole(event.target.value);
      };

      const handleAddIconClickOpen = () => {
        setAddStaffOpen(true);
      };

      const handleAddDialogClose = () => {
        setAddStaffOpen(false);
      };

      const handleAddNewUser = () => {
        if (!email || !name || !role) {
          alert("New user's email, name, and role must be provided");
          return;
        }
        if (existingUserEmails.indexOf(email) > -1) {
          alert(`User email ${email} already exists`);
          return;
        }
        let newUser = { email: email, name: name, role: role };
        db.addUser(newUser);
        setAddStaffOpen(false);
      };

      return (
        <div className={`${classes.root} maxWidth`}>
          <Paper className={`${classes.paper} maxWidth`}>
            <RecordSearchBar
              title={pageTitle}
              headers={headers}
              onSearchClicked={handleSearchClicked}
            />
            <TableContainer>
              <Table className={classes.table} size="medium">
                <SortingTableHead
                  classes={classes}
                  order={currentListViewOrder}
                  orderBy={currentListViewOrderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={records.length}
                  headerCells={headers}
                />
                {currentViewMode === viewModes.STAFF_LIST ? (
                  <TableBody>
                    {records.map((row) => (
                      <TableRow hover key={row.id}>
                        {headers.map((column) => (
                          <TableCell key={`${row.id}-${column.id}`}>
                            {column.id === 'action' ? (
                              <>
                                <Tooltip title="Edit user" aria-label="edit" placement="bottom">
                                  <IconButton
                                    color="inherit"
                                    onClick={() => handleEditIconClicked(row)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete user" aria-label="delete" placement="bottom">
                                  <IconButton
                                    color="inherit"
                                    onClick={() => handleDeleteIconClicked(row)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              </>
                            ) : (
                              <div className="list-row">
                                <Typography>{row[column.id]}</Typography>
                              </div>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                ) : (
                  <TableBody>
                    {records.map((row) => (
                      <TableRow hover key={row.id} onClick={() => handleRowClicked(row)}>
                        {headers.map((column) => (
                          <TableCell key={`${row.id}-${column.id}`}>
                            <div className="list-row">
                              <Typography>{row[column.id]}</Typography>
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[20, 50, 100]}
              component="div"
              count={-1}
              rowsPerPage={rowsPerPage}
              page={page}
              labelDisplayedRows={({ page }) => `Page ${page + 1}`}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              nextIconButtonProps={{
                disabled: nextButtonDisabled,
              }}
            />
          </Paper>
          {collection !== collectionType.NEW && (
            <Tooltip
              title={
                currentViewMode === viewModes.PARTICIPANT_LIST
                  ? 'Create new participant record'
                  : 'Add user account'
              }
              aria-label="create"
              placement="left"
            >
              <Fab
                color="primary"
                className={classes.fab}
                onClick={() => {
                  currentViewMode === viewModes.PARTICIPANT_LIST
                    ? handleClickNew()
                    : handleAddIconClickOpen();
                }}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          )}

          <Dialog open={addStaffOpen} onClose={setAddStaffOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create a new user</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                required
                margin="dense"
                id="email"
                label="Email"
                type="email"
                size="medium"
                onChange={handleEmailChange}
                fullWidth
              />
              <TextField
                required
                margin="dense"
                id="name"
                label="Name"
                type="name"
                size="medium"
                onChange={handleNameChange}
                fullWidth
              />
              <FormControl required fullWidth>
                <InputLabel id="demo-simple-select-required-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={role}
                  onChange={handleRoleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'staff'}>Staff</MenuItem>
                  <MenuItem value={'admin'}>Admin</MenuItem>
                </Select>
                {/* <FormHelperText>Required</FormHelperText> */}
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddNewUser} color="primary">
                Create
              </Button>
              <Button onClick={handleAddDialogClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    },
  ),
);

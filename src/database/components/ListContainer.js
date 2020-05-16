import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
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
import { makeStyles } from '@material-ui/core/styles';
import { RecordSearchBar } from './RecordSearchBar';
import { SortingTableHead } from './SortingTableHead';
import { uiStore, participantStore, userStore } from '../../injectables';
import { viewModes, participantDetailViewModes, collectionType } from '../../constants';
import './style/ListContainer.css';

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
  'userStore'
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
      const { collection, limit: participantLimit } = participantStore;
      const { limit: userLimit } = userStore;
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
        onChangeRowsPerPage(event.target.value);
      };

      const handleEditIconClicked = (event, row) => {
        // TODO onClick covert Typography into TextField
        // TODO handle Edit functionality of user management
      };

      const handleDeleteIconClicked = (event, row) => {
        // TODO handle Delete functionlity of user management
      };

      const ListRow = ({ data, columnName }) => {
        const isDate = ['birthDate', 'createdAt'].includes(columnName);
        return (
          <div className="list-row">
            <Typography variant="body2">
              {isDate ? moment(data).format('MMM D, YYYY') : data}
            </Typography>
          </div>
        );
      };

      return (
        <div className={`${classes.root} maxWidth`}>
          <Paper className={`${classes.paper} maxWidth`}>
            <RecordSearchBar
              title={pageTitle}
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
                <TableBody>
                  {records.map((row) => (
                    <TableRow hover key={row.id} onClick={() => handleRowClicked(row)}>
                      {headers.map((column) => (
                        <TableCell key={`${row.id}-${column.id}`}>
                          {currentViewMode === viewModes.STAFF_LIST && column.id === 'action' ? (
                            <>
                              <Tooltip title="Edit user" aria-label="edit" placement="bottom">
                                <IconButton color="inherit">
                                  <EditIcon onClick={() => handleEditIconClicked(row)} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete user" aria-label="delete" placement="bottom">
                                <IconButton color="inherit">
                                  <DeleteIcon onClick={() => handleDeleteIconClicked(row)} />
                                </IconButton>
                              </Tooltip>
                            </>
                          ) : (
                            <ListRow data={row[column.id]} columnName={column.id}/>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[20, 50, 100]}
              component="div"
              count={-1}
              rowsPerPage={currentViewMode === viewModes.PARTICIPANT_LIST ? participantLimit : userLimit}
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
                    : // TODO: Add add staff method
                      console.log('Add new staff account');
                }}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          )}
        </div>
      );
    },
  ),
);

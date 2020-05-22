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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { RecordSearchBar } from './RecordSearchBar';
import { SortingTableHead } from './SortingTableHead';
import { StatusIndicator } from '../StatusIndicator';
import { participantStore, uiStore, userStore } from '../../../injectables';
import { collectionType, participantDetailViewModes, viewModes } from '../../../constants';
import { UserDialog, UserManagementAction } from '../userManagement';
import '../style/ListContainer.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(2),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  root: {
    cursor: 'pointer',
  },
}));

/**
 * Generic list container used for both participant records and user list
 * @param {array} records list of objects to populate table with
 * @param {function} onRowClicked handler function for row clicks
 * @param {function} onPrevButtonClicked handler function for next backward table pagination
 * @param {function} onNextButtonClicked handler function for next forward table pagination
 * @param {boolean} nextButtonDisabled flag to disable next button
 * @param {function} onOrderChanged handler function for sorting events
 * @param {function} onSearchClicked handler function for searching events
 */
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
      const [addStaffOpen, setAddStaffOpen] = useState(false);
      const { collection, limit: participantLimit, isListLoading } = participantStore;
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
        setCurrentParticipantDetailStep,
      } = uiStore;

      const pageTitle =
        currentViewMode === viewModes.PARTICIPANT_LIST
          ? collection === collectionType.NEW
            ? 'New Applications'
            : 'Participants'
          : 'Staff';

      /**
       * Handler for row click events
       */
      const handleClickNew = () => {
        setCurrentParticipantDetailStep(0);
        setCurrentViewMode(viewModes.PARTICIPANT_DETAIL);
        setCurrentParticipantDetailViewMode(participantDetailViewModes.CREATE);
      };

      /**
       * Sets the object represented by the table row to the currently-selected user or participant in the
       * respective store
       * @param {Object} clickedRow
       */
      const handleParticipantRowClicked = (clickedRow) => {
        onRowClicked(clickedRow);
        setCurrentViewMode(currentDetailViewMode);
        setCurrentParticipantDetailViewMode(participantDetailViewModes.VIEW);
      };

      /**
       * Handler for changing header to sort by
       * @param {string} property header to sort by
       * @param {string} queryProperty current sort
       */
      const handleRequestSort = (event, property, queryProperty) => {
        // Go back to the first page whenever there is an update on the sort field
        setPage(0);
        const isAsc = currentListViewOrderBy === property && currentListViewOrder === 'asc';
        const order = isAsc ? 'desc' : 'asc';
        setCurrentListViewOrder(order);
        setCurrentListViewOrderBy(property);
        onOrderChanged(queryProperty, order);
      };

      /**
       * Handler for changing search by and search text
       * @param {string} searchBy header to search
       * @param {string} searchText text to perform search with
       */
      const handleSearchClicked = (searchBy, searchText) => {
        // Go back to the first page whenever the user perform a search
        setPage(0);
        onSearchClicked(searchBy, searchText);
      };

      /**
       * Table pagination handler
       * @param {int} newPage page index
       */
      const handleChangePage = (event, newPage) => {
        // Checking the direction when moving from one page to another
        if (newPage < page) {
          onPrevButtonClicked();
        } else {
          onNextButtonClicked();
        }
        setPage(newPage);
      };

      /**
       * Handler for changing number of rows in the table
       * @param {Event} event
       */
      const handleChangeRowsPerPage = (event) => {
        // Go back to the first page whenever the user changes the number of rows per page
        setPage(0);
        onChangeRowsPerPage(event.target.value);
      };

      /**
       * Renders cell data
       * @param {Object} data row data
       * @param {string} column header name
       */
      const ListCell = ({ data, column }) => {
        const isDate = ['birthDate', 'createdAt'].includes(column);
        let cellData = data[column];
        const isEmpty = cellData === '' || data === [];
        if (isEmpty) {
          cellData = <em>None</em>;
        }
        return (
          <div className="list-row">
            {column === 'status' ? (
              <StatusIndicator status={cellData} />
            ) : (
              <Typography variant="body2">
                {isDate && !isEmpty ? moment(cellData).format('MMM D, YYYY') : cellData}
              </Typography>
            )}
          </div>
        );
      };

      return (
        <div className="maxWidth list-container">
          <Paper className={`${classes.paper} maxWidth`}>
            <RecordSearchBar title={pageTitle} onSearchClicked={handleSearchClicked} />
            <TableContainer>
              <Table className={classes.table} size="medium">
                <SortingTableHead
                  order={currentListViewOrder}
                  orderBy={currentListViewOrderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={records.length}
                  headerCells={headers}
                />
                {!isListLoading && (
                  <TableBody>
                    {records.map((row) => (
                      <TableRow
                        hover
                        classes={
                          currentViewMode === viewModes.PARTICIPANT_LIST && { root: classes.root }
                        }
                        key={row.id}
                        onClick={() =>
                          currentViewMode === viewModes.PARTICIPANT_LIST &&
                          handleParticipantRowClicked(row)
                        }
                      >
                        {headers.map((column) => (
                          <TableCell key={`${row.id}-${column.id}`}>
                            {currentViewMode === viewModes.STAFF_LIST && column.id === 'action' ? (
                              <UserManagementAction row={row} />
                            ) : (
                              <ListCell data={row} column={column.id} />
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            {records.length < 1 ? (
              <div className="list-empty-contents">
                {isListLoading ? (
                  <CircularProgress color="primary" />
                ) : (
                  <Typography color="textSecondary">No records to show</Typography>
                )}
              </div>
            ) : (
              <TablePagination
                rowsPerPageOptions={[20, 50, 100]}
                component="div"
                count={-1}
                rowsPerPage={
                  currentViewMode === viewModes.PARTICIPANT_LIST ? participantLimit : userLimit
                }
                page={page}
                labelDisplayedRows={({ page }) => `Page ${page + 1}`}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                nextIconButtonProps={{
                  disabled: nextButtonDisabled,
                }}
              />
            )}
          </Paper>
          {(currentViewMode === viewModes.PARTICIPANT_LIST ||
            currentViewMode === viewModes.STAFF_LIST) && (
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
                    : setAddStaffOpen(true);
                }}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          )}
          <UserDialog open={addStaffOpen} setOpen={setAddStaffOpen} mode="create" />
        </div>
      );
    },
  ),
);

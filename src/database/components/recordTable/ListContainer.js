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
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { RecordSearchBar } from './RecordSearchBar';
import { SortingTableHead } from './SortingTableHead';
import { StatusIndicator } from '../StatusIndicator';
import { uiStore, participantStore, userStore } from '../../../injectables';
import { viewModes, participantDetailViewModes, collectionType } from '../../../constants';
import { UserCreateDialog, UserManagementAction } from '../userManagement';
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
      const { collection, limit: participantLimit } = participantStore;
      const { users, limit: userLimit } = userStore;
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

      const handleParticipantRowClicked = (clickedRow) => {
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

      const [addStaffOpen, setAddStaffOpen] = useState(false);
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
        <div className={`${classes.root} maxWidth`}>
          <Paper className={`${classes.paper} maxWidth`}>
            <RecordSearchBar title={pageTitle} onSearchClicked={handleSearchClicked} />
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
                    <TableRow hover key={row.id} onClick={() => handleParticipantRowClicked(row)}>
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
              </Table>
            </TableContainer>
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
                    : setAddStaffOpen(true);
                }}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          )}
          <UserCreateDialog
            users={users}
            addStaffOpen={addStaffOpen}
            setAddStaffOpen={setAddStaffOpen}
          />
        </div>
      );
    },
  ),
);

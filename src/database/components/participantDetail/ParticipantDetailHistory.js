import React from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { fieldNames } from '../../../fields';
import '../style/ParticipantDetailHistory.css';

export const ParticipantDetailHistory = ({ participant }) => {
  const { nameLast, nameGiven, history } = participant;
  const events = !!history ? history : [];
  const participantName = nameLast !== '' ? `${nameGiven} ${nameLast}` : undefined;

  // Gets display values for the changed fields table cells
  const getCellValue = (header, data) => {
    if (header === 'name') {
      return fieldNames[data];
    } else {
      const value = Array.isArray(data) ? data.join(', ') : data;
      return value === [] || value === '' ? <em>None</em> : value;
    }
  };

  const renderChangedFields = (fields) => {
    const headers = [
      { id: 'name', label: 'Field' },
      { id: 'oldValue', label: 'Previous value' },
      { id: 'newValue', label: 'Updated value' },
    ];
    return (
      <div className="participant-detail-history-table">
        <TableContainer>
          <Table size="small" aria-label="changed fields table">
            <TableHead>
              <TableRow>
                {headers.map((header) => {
                  const { id, label } = header;
                  return <TableCell key={`history-fields-header-${id}`}>{label}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((field) => {
                return (
                  <TableRow key={`history-fields-${field.name}`}>
                    {headers.map((header) => {
                      const { id } = header;
                      return (
                        <TableCell key={`history-fields-${field.name}-${id}`}>
                          {getCellValue(id, field[id])}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  const renderHistoryEvent = (historyEvent) => {
    const { text, fields, timestamp, user } = historyEvent;
    const dateString = moment(timestamp).format('ddd, MMM D YYYY, h:mm a');
    return (
      <div key={`history-event-${timestamp}`} className="participant-detail-history-container">
        <div className="participant-detail-history-header">
          <Typography>
            <strong>{text}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dateString}
          </Typography>
        </div>
        <Typography color="textSecondary" gutterBottom>
          {user}
        </Typography>
        {!!fields && (
          <>
            <Typography variant="body2">Fields changed:</Typography>
            {renderChangedFields(fields)}
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="participant-detail-header">
        <div className="participant-detail-header-text">
          <Typography variant="h6">{`Participant Details - History`}</Typography>
          <Typography variant="h5">{participantName}</Typography>
        </div>
      </div>
      <>
        {events.map((event, index) => (
          <div key={event.timestamp}>
            {renderHistoryEvent(event)}
            <Divider />
          </div>
        ))}
      </>
    </>
  );
};

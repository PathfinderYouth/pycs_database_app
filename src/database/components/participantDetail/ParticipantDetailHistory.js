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

/**
 * Participant history page component
 * @param {Object} participant participant data object
 */
export const ParticipantDetailHistory = ({ participant }) => {
  // if participant is defined, extract the name and history, else leave undefined
  let events = [];
  let participantName;
  if (!!participant) {
    const { nameLast, nameGiven, history } = participant;
    events = !!history ? history : [];
    participantName = nameLast !== '' ? `${nameGiven} ${nameLast}` : undefined;
  }

  /**
   * Formats cell data depending on if is a string, array, or date string
   * @param {Object} header header key and name
   * @param {string | array} data field data
   * @param {string} fieldName field name key
   */
  const getCellValue = (header, data, fieldName) => {
    // if the header is the name of the field, get the prettyName of the field
    if (header === 'name') {
      return fieldNames[data];
    } else {
      let value;
      // if the fieldName is birth date, format the date string using moment
      if (fieldName === 'birthDate') {
        value = data !== '' ? moment(data).format('MMM D, YYYY') : '';
      } else {
        // if the fieldName is any other field, format it with commas if it is an array, otherwise just
        // return the field data
        value = Array.isArray(data) ? data.join(', ') : data;
      }
      // if the field is empty, return "None"
      return value === [] || value === '' ? <em>None</em> : value;
    }
  };

  /**
   * For history events that contain a list of changed fields, render the changed fields into a table
   * component
   * @param {array} fields list of changed fields
   */
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
                          {getCellValue(id, field[id], field.name)}
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

  /**
   * Renders history event components
   * @param {Object} historyEvent history event object
   */
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
        {events.map((event) => (
          <div key={event.timestamp}>
            {renderHistoryEvent(event)}
            <Divider />
          </div>
        ))}
      </>
    </>
  );
};

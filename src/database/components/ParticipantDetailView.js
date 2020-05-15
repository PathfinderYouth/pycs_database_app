import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import NumberFormat from 'react-number-format';
import { participantDetailSteps } from '../../fields';
import { collectionType, masks } from '../../constants';
import './style/ParticipantDetailView.css';

export const ParticipantDetailView = ({
  participant,
  collection,
  currentStep,
  handleClickChangeMode,
  handleClickMove,
  handleClickDelete,
  handleClickApprove,
  handleClickDeny,
}) => {
  const step = participantDetailSteps[currentStep];
  const participantName = `${participant.nameGiven} ${participant.nameLast}`;

  const MaskedSIN = ({ sin }) => {
    const maskedSIN = `XXX XXX ${sin.slice(6)} (click to show)`;
    const formattedSIN = <NumberFormat value={sin} format={masks.sin} displayType="text" />;
    const [showSIN, setShowSIN] = useState(false);
    return (
      <div className="participant-detail-SIN">
        <Typography color="textSecondary" onClick={() => setShowSIN(!showSIN)}>
          {showSIN ? formattedSIN : maskedSIN}
        </Typography>
      </div>
    );
  };

  const renderFieldData = (field, data) => {
    const { name, adornment } = field;
    let renderedData = null;
    if (data.length === 0 || data === undefined) {
      renderedData = <em>None given</em>;
    } else if (field.name === 'sin') {
      return <MaskedSIN sin={data} />;
    } else {
      if (field.mask) {
        renderedData = (
          <NumberFormat
            name={name}
            value={data}
            format={name.toLowerCase().includes('phone') ? masks.phone : masks[name]}
            displayType="text"
            prefix={adornment}
            thousandSeparator={!!adornment}
            decimalScale={2}
            fixedDecimalScale={!!adornment}
            isNumericString
          />
        );
      } else {
        renderedData = Array.isArray(data) ? data.join(', ') : data;
      }
    }
    return <Typography color="textSecondary">{renderedData}</Typography>;
  };

  const getButtons = () => {
    return collection === collectionType.NEW ? (
      <div>
        <Tooltip title="Edit submission" aria-label="edit">
          <IconButton onClick={handleClickChangeMode}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Accept and save" aria-label="accept">
          <IconButton
            onClick={() => {
              if (window.confirm('Accept and save this submission to the database?')) {
                handleClickMove();
              }
            }}
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Discard submission" aria-label="delete">
          <IconButton
            onClick={() => {
              if (window.confirm('Discard submission? This cannot be undone.')) {
                handleClickDelete();
              }
            }}
          >
            <DeleteIcon 
            color="error"/>
          </IconButton>
        </Tooltip>
      </div>
    ) : (
      <div>
      <Tooltip title="Edit participant record" aria-label="edit">
        <IconButton onClick={handleClickChangeMode}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Approve participant" aria-label="accept">
        <IconButton
          onClick={() => {
            if (window.confirm('Approve participant')) {
              handleClickApprove();
            }
          }}
        >
          <ThumbUpIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Deny participant" aria-label="accept">
        <IconButton
          onClick={() => {
            if (window.confirm('Approve participant')) {
              handleClickDeny();
            }
          }}
        >
          <ThumbDownIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete participant record" aria-label="delete">
        <IconButton
          onClick={() => {
            if (window.confirm('Delete participant record?')) {
              handleClickDelete();
            }
          }}
        >
          <DeleteIcon 
          color="error"/>
        </IconButton>
      </Tooltip>
    </div>
    );
  };

  return (
    <>
      <div className="participant-detail-header">
        <div>
          <Typography variant="h6">{`Participant Details - ${step.stepName}`}</Typography>
          <Typography variant="h4">{participantName}</Typography>
        </div>
        {getButtons()}
      </div>
      <div className="participant-detail-form-contents">
        <Grid container spacing={2}>
          {step.fields.map((field) => {
            const { name, size, detailSize, prettyName } = field;
            // if both size & detailSize undefined, use true, else use detailSize if defined, size if not
            const viewSize = !detailSize && !size ? true : !!detailSize ? detailSize : size;
            return (
              <Grid key={name} item md={viewSize} xs={12}>
                <Typography variant="button">{prettyName}</Typography>{' '}
                {renderFieldData(field, participant[name])}
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};

import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import NumberFormat from 'react-number-format';
import { participantDetailSteps } from '../../fields';
import { masks } from '../../constants';
import { ParticipantDetailPageHeader } from './ParticipantDetailPageHeader';
import './style/ParticipantDetailView.css';
import { participantDetailViewModes } from '../../constants';

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

  return (
    <ParticipantDetailPageHeader
      title={`Viewing participant record - ${step.stepName}`}
      participantName={participantName}
      step={step}
      collection={collection}
      participantDetailViewMode={participantDetailViewModes.VIEW}
      handleClickChangeMode={handleClickChangeMode}
      handleClickMove={handleClickMove}
      handleClickDelete={handleClickDelete}
      handleClickApprove={handleClickApprove}
      handleClickDeny={handleClickDeny}
    >
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
    </ParticipantDetailPageHeader>
  );
};

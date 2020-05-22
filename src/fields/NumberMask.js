import React from 'react';
import NumberFormat from 'react-number-format';
import { masks } from '../constants';

/**
 * Number masking component for formatting number inputs (phone, SIN, PHN, etc)
 * @param {component} inputRef input component associated with this NumberMask component
 * @param {function} onChange onChange handler function
 * @param {string} name field name
 * @param {Object} other other props passed in from the parent component
 */
export const NumberMask = ({ inputRef, onChange, name, ...other }) => {
  return (
    <NumberFormat
      {...other}
      name={name}
      getInputRef={inputRef}
      format={name.toLowerCase().includes('phone') ? masks.phone : masks[name]}
      onValueChange={(values) => {
        onChange({
          target: {
            name: name,
            value: values.value,
          },
        });
      }}
      isNumericString
    />
  );
};

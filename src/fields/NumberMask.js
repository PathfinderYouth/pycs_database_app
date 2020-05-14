import React from 'react';
import NumberFormat from 'react-number-format';

const masks = {
  sin: '### ### ###',
  bcCareCardNumber: '#### ### ###',
  phone: '(###) ###-####',
};

export const NumberMask = (props) => {
  const { inputRef, onChange, name, ...other } = props;
  return (
    <NumberFormat
      {...other}
      name={name}
      getInputRef={inputRef}
      format={name.toLowerCase().includes('phone') ? masks.phone : masks[name]}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
    />
  );
};

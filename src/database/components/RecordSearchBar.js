import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Search from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';

export const RecordSearchBar = () => {
  const [value, setValue] = React.useState('SIN');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Typography gutterBottom>Find a participant record:</Typography>
      <TextField
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="searchMethod"
          name="searchMethod"
          value={value}
          onChange={handleChange}
          row
        >
          <FormControlLabel
            value="sin"
            control={<Radio />}
            label="SIN"
          />
          <FormControlLabel
            value="name"
            control={<Radio />}
            label="Name"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Search from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { InputLabel } from '@material-ui/core';
import './style/RecordSearchBar.css';

export const RecordSearchBar = () => {
  const [value, setValue] = React.useState('lastName');

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
      <FormControl className="formControl">
        <InputLabel>Search By</InputLabel>
        <Select
          className="formControl"
          defaultValue={value}
          onChange={handleChange}
        >
          <MenuItem value="lastName">Last Name</MenuItem>
          <MenuItem value="firstName">First Name</MenuItem>
          <MenuItem value="sin">SIN</MenuItem>
          <MenuItem value="birthDate">Date of Birth</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

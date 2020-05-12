import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Search from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './style/RecordSearchBar.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(2) },
}));

export const RecordSearchBar = (props) => {
  const [value, setValue] = React.useState('lastName');
  const classes = useStyles();
  const { title, headers } = props;
  const [helperText, setHelperText] = useState(headers[0].label);

  const handleChange = (event) => {
    setValue(event.target.value);
    setHelperText(event.target.value.label);
  };

  return (
    <div className={`${classes.root} searchBar`}>
      <Typography variant="h6">{title}</Typography>
      <TextField
        className="searchBox"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <FormControl>
              <Select className="formControl" defaultValue={headers[0]} onChange={handleChange}>
                {headers.map((header) => {
                  return <MenuItem value={header.id}>{header.label}</MenuItem>;
                })}
              </Select>
            </FormControl>
          ),
        }}
      />
    </div>
  );
};

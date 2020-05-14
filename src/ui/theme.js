import { createMuiTheme } from '@material-ui/core/styles';

const pathfinderDarkGreen = {
  light: '#37834f',
  main: '#056524',
  dark: '#034619',
  contrastText: '#fff',
};

const pathfinderLightGreen = {
  light: '#D4F1B5',
  main: '#8FC456',
  dark: '#64893c',
  contrastText: '#fff',
};

export const theme = createMuiTheme({
  palette: {
    primary: pathfinderDarkGreen,
    secondary: pathfinderLightGreen,
  },
});

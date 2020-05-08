import { createMuiTheme } from '@material-ui/core/styles';

const pathfinderDarkGreen = {
  light: '#37834f',
  main: '#056524',
  dark: '#034619',
  contrastText: '#fff'
}

const pathfinderLightGreen = {
  light: '#64893c',
  main: '#8FC456',
  dark: '#a5cf77',
  contrastText: '#fff'
}

export const theme = createMuiTheme({
  palette: {
    primary: pathfinderDarkGreen,
    secondary: pathfinderLightGreen,
  },
});
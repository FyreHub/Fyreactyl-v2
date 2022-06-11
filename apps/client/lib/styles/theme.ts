import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#FFDE03',
      main: '#FFDE03',
      dark: '#FFDE03',
      contrastText: '#000',
    },
    secondary: {
      light: '#0336FF',
      main: '#0336FF',
      dark: '#0336FF',
      contrastText: '#fff',
    },
  },
});

export default theme;

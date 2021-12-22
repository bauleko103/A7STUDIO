import './App.css';
import { BrowserRouter } from "react-router-dom";
import { HeaderW } from './components/Layouts/HeaderW';
import { ThemeProvider, createTheme } from '@mui/material';
import Router from './routes/index';

function App() {
  return (
    <ThemeProvider theme={createTheme({
      typography: {
        fontFamily: 'Avo',
      }
    })}>
      <BrowserRouter>
        <HeaderW />
        <Router/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

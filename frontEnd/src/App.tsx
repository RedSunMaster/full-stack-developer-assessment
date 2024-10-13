import * as React from 'react';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { ViewRecordsPage } from './pages/viewRecordsPage'

import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontWeightLight: 300,  // Light (300)
    fontWeightRegular: 400,  // Regular (400)
    fontWeightMedium: 500,  // Medium (500)
    fontWeightBold: 700,  // Bold (700)
  },
});

function App() {
  return (
    <div>
      <Router>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<ViewRecordsPage />}>
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;

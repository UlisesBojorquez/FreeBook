import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './Fonts/Century Gothic.ttf'
import './Fonts/Century Gothic Bold.ttf'
import { SnackbarProvider } from 'notistack';
import Grow from '@material-ui/core/Grow';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider 
        maxSnack={1}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        TransitionComponent={Grow}
        autoHideDuration={3000}
        > 
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
